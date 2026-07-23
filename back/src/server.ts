import cluster from 'node:cluster';
import os from 'node:os';
import { FastifyInstance } from 'fastify';
import { buildApp } from './app';
import { env } from './config/env';

const SHUTDOWN_TIMEOUT_MS = 10000;

function forceExitIfShutdownHangs(timeoutMs: number) {
  return setTimeout(() => process.exit(1), timeoutMs);
}

function createShutdownHandler(app: FastifyInstance) {
  return async (signal: string) => {
    app.log.info(`received ${signal}, shutting down`);
    const forceExitTimer = forceExitIfShutdownHangs(SHUTDOWN_TIMEOUT_MS);
    try {
      await app.close();
      clearTimeout(forceExitTimer);
      process.exit(0);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };
}

function registerShutdownSignals(shutdown: (signal: string) => Promise<void>) {
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

function shutdownOnUnhandledNodeErrors(app: FastifyInstance, shutdown: (signal: string) => Promise<void>) {
  const logErrorThenShutdownNodeProcess = (errorType: string) => (err: unknown) => {
    app.log.error(err, errorType);
    void shutdown(errorType);
  };

  process.on('uncaughtException', logErrorThenShutdownNodeProcess('uncaughtException'));
  process.on('unhandledRejection', logErrorThenShutdownNodeProcess('unhandledRejection'));
}

async function startWorker() {
  const app = buildApp();

  await app.listen({ port: env.port, host: env.host });

  const shutdown = createShutdownHandler(app);
  registerShutdownSignals(shutdown);
  shutdownOnUnhandledNodeErrors(app, shutdown);
}

function forkWorkerPerCpu() {
  const workers = os.cpus().length;
  for (let i = 0; i < workers; i++) cluster.fork();

  cluster.on('exit', (worker) => {
    console.error(`worker ${worker.process.pid} died, restarting`);
    cluster.fork();
  });
}

if (cluster.isPrimary && env.clusterEnabled) {
  forkWorkerPerCpu();
} else {
  void startWorker();
}
