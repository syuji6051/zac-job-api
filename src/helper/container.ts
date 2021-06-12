import { AsyncContainerModule, interfaces } from 'inversify';
import { logger } from '@syuji6051/zac-job-library';
import { container } from '@/src/providers/container';

// eslint-disable-next-line import/prefer-default-export
export const asyncModule = <PromiseValue>(
  asyncFunction: Promise<PromiseValue>,
  symbolName: symbol,
) => new AsyncContainerModule(
    async (bind: interfaces.Bind, _, isBound: interfaces.IsBound) => {
      logger.debug(`initializer ${symbolName.toString()} load start`);
      const value = await asyncFunction;
      if (!isBound<PromiseValue>(symbolName)) {
        bind<PromiseValue>(symbolName).toConstantValue(value);
      } else {
        logger.debug(`already exists container key: ${symbolName.toString()}`);
      }
      logger.debug(`initializer ${symbolName.toString()} load end`);
    },
  );

export const seriesLoadAsync = async (modules: (() => AsyncContainerModule)[]) => {
  for (const module of modules) {
    // eslint-disable-next-line no-await-in-loop
    await container.loadAsync(module());
  //   await container.loadAsync(module);
  }
};
