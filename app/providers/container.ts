import { Container } from 'inversify';
import "reflect-metadata";

export const container = new Container();

export const TYPES = {
  USECASE_USERS: Symbol.for('USECASE_USERS'),
  USECASE_WORKS: Symbol.for('USECASE_WORKS'),
  STORE_USERS: Symbol.for('STORE_USERS'),
  STORE_WORKS: Symbol.for('STORE_WORKS'),
};

import { Users as UseCaseUsers } from '../usecases/Users';
import { Users as UseCaseUsersImpl } from '../usecases/implementations/Users';
container.bind<UseCaseUsers>(TYPES.USECASE_USERS).to(UseCaseUsersImpl);

import { Works as UseCaseWorks } from 'app/usecases/Works';
import { Works as UseCaseWorksImpl } from '../usecases/implementations/Works';
container.bind<UseCaseWorks>(TYPES.USECASE_WORKS).to(UseCaseWorksImpl);

import { Users as StoreUsers } from '../usecases/stores/Users';
import { Users as StoreUsersImpl } from '../adapters/cognito/Users';
container.bind<StoreUsers>(TYPES.STORE_USERS).to(StoreUsersImpl);

import { Works as StoreWorks } from 'app/usecases/stores/Works';
import { Works as StoreWorksImpl } from '../adapters/puppeteer/Works';
container.bind<StoreWorks>(TYPES.STORE_WORKS).to(StoreWorksImpl);
