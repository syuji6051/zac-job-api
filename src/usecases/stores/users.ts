/* eslint-disable no-unused-vars */
import {
  User, Users as EntitiesUsers, Attribute,
} from '@/src/entities/users';

export interface Users {
  create(email: string, password: string): Promise<User>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>
  putZacLogin(userId: string, userAttribute: Attribute): Promise<void>;
  putObcLogin(userId: string, userAttribute: Attribute): Promise<void>;
}
