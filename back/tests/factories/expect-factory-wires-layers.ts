import { expect } from 'vitest';

interface Layer {
  Class: new (...args: any[]) => any;
  args: unknown[];
}

export function expectFactoryWiresLayers(create: () => unknown, layers: Layer[]): void {
  const instance = create();

  for (const { Class, args } of layers) {
    expect(Class).toHaveBeenCalledWith(...args);
  }

  const ControllerClass = layers[layers.length - 1].Class;
  expect(instance).toBeInstanceOf(ControllerClass);
}
