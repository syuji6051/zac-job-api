/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import { Container } from 'inversify';
import 'reflect-metadata';
global.crypto = require('crypto');

export const container = new Container();

export const TYPES = {
  USECASE_USERS: Symbol.for('USECASE_USERS'),
  USECASE_WORKS: Symbol.for('USECASE_WORKS'),
  USECASE_ZAC: Symbol.for('USECASE_ZAC'),
  STORE_USERS: Symbol.for('STORE_USERS'),
  STORE_WORKS: Symbol.for('STORE_WORKS'),
  STORE_ZAC: Symbol.for('STORE_ZAC'),
  ASM_VALUES: Symbol.for('ASM_VALUES'),
  PUPPETEER_CREDENTIAL: Symbol.for('PUPPETEER_CREDENTIAL'),
};

import { Users as UseCaseUsers } from '@/src/usecases/users';
import UseCaseUsersImpl from '@/src/usecases/implementations/users';
container.bind<UseCaseUsers>(TYPES.USECASE_USERS).to(UseCaseUsersImpl);

import { Works as UseCaseWorks } from '@/src/usecases/works';
import UseCaseWorksImpl from '@/src/usecases/implementations/works';
container.bind<UseCaseWorks>(TYPES.USECASE_WORKS).to(UseCaseWorksImpl);

import { Zac as UseCaseZac } from '@/src/usecases/zac';
import UseCaseZacImpl from '@/src/usecases/implementations/zac';
container.bind<UseCaseZac>(TYPES.USECASE_ZAC).to(UseCaseZacImpl);

import { Users as StoreUsers } from '@/src/usecases/stores/users';
import StoreUsersImpl from '@/src/adapters/stores/users';
container.bind<StoreUsers>(TYPES.STORE_USERS).to(StoreUsersImpl);

import { Works as StoreWorks } from '@/src/usecases/stores/works';
import StoreWorksImpl from '@/src/adapters/stores/works';
container.bind<StoreWorks>(TYPES.STORE_WORKS).to(StoreWorksImpl);

import StoreZac from '@/src/usecases/stores/zac';
import StoreZacImpl from '@/src/adapters/puppeteer/zac';
container.bind<StoreZac>(TYPES.STORE_ZAC).to(StoreZacImpl);
