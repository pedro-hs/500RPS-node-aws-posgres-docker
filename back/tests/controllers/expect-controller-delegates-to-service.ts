import { vi, expect } from 'vitest';

interface ExpectControllerDelegatesToServiceOptions {
  requestBody?: unknown;
  statusCode?: number;
}

export async function expectControllerDelegatesToService<TService extends Record<string, any>>(
  controllerMethod: (request: any, reply: any) => Promise<void>,
  service: TService,
  serviceMethod: keyof TService,
  { requestBody, statusCode }: ExpectControllerDelegatesToServiceOptions = {},
): Promise<void> {
  const result = { fake: 'result' };
  service[serviceMethod].mockResolvedValue(result);

  const request = { body: requestBody };
  const reply = { send: vi.fn(), code: vi.fn().mockReturnThis() };

  await controllerMethod(request, reply);

  const expectedArgs = requestBody === undefined ? [] : [requestBody];
  expect(service[serviceMethod]).toHaveBeenCalledWith(...expectedArgs);

  if (statusCode !== undefined) {
    expect(reply.code).toHaveBeenCalledWith(statusCode);
  }
  expect(reply.send).toHaveBeenCalledWith(result);
}
