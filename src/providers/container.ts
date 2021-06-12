/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import { AsyncContainerModule, Container, interfaces } from 'inversify';
import { Credentials } from 'aws-sdk';
import logger from '@/src/lib/logger';
import 'reflect-metadata';
global.crypto = require('crypto');

export const container = new Container();

export const TYPES = {
  USECASE_USERS: Symbol.for('USECASE_USERS'),
  USECASE_WORKS: Symbol.for('USECASE_WORKS'),
  STORE_USERS: Symbol.for('STORE_USERS'),
  STORE_WORKS: Symbol.for('STORE_WORKS'),
  ASM_VALUES: Symbol.for('ASM_VALUES'),
  PUPPETEER_CREDENTIAL: Symbol.for('PUPPETEER_CREDENTIAL'),
};

import { getSecretsManager } from '@/src/lib/asm';
import { SecretsValues } from '@/src/entities/environments';
export const asyncModules = container.loadAsync(
  new AsyncContainerModule(async (bind: interfaces.Bind) => {
    logger.debug('initializer load start');
    const secrets = await getSecretsManager();
    bind<SecretsValues>(TYPES.ASM_VALUES).toConstantValue(secrets);
    const credential = new Credentials(
      secrets.PUPPETEER_API_ACCESS_KEY, secrets.PUPPETEER_API_SECRET_KEY,
    );
    bind<Credentials>(TYPES.PUPPETEER_CREDENTIAL).toConstantValue(credential);
  }),
);

import { Users as UseCaseUsers } from '@/src/usecases/users';
import UseCaseUsersImpl from '@/src/usecases/implementations/users';
container.bind<UseCaseUsers>(TYPES.USECASE_USERS).to(UseCaseUsersImpl);

import { Works as UseCaseWorks } from '@/src/usecases/works';
import UseCaseWorksImpl from '@/src/usecases/implementations/works';
container.bind<UseCaseWorks>(TYPES.USECASE_WORKS).to(UseCaseWorksImpl);

import { Users as StoreUsers } from '@/src/usecases/stores/users';
import StoreUsersImpl from '@/src/adapters/stores/users';
container.bind<StoreUsers>(TYPES.STORE_USERS).to(StoreUsersImpl);

import { Works as StoreWorks } from '@/src/usecases/stores/works';
import StoreWorksImpl from '@/src/adapters/stores/works';
container.bind<StoreWorks>(TYPES.STORE_WORKS).to(StoreWorksImpl);
