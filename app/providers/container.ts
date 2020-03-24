import { Container } from 'inversify';

export const container = new Container();

export const TYPES = {
  USECASE_USERS: Symbol.for('USECASE_USERS'),
  STORE_USERS: Symbol.for('STORE_USERS'),
};

import { Users as UseCaseUsers } from '../usecases/Users';
import { Users as UseCaseUsersImpl } from '../usecases/implementations/Users';
container.bind<UseCaseUsers>(TYPES.USECASE_USERS).to(UseCaseUsersImpl);

import { Users as StoreUsers } from '../usecases/stores/Users';
import { Users as StoreUsersImpl } from '../adapters/cognito/Users';
container.bind<StoreUsers>(TYPES.STORE_USERS).to(StoreUsersImpl);
