/* eslint-disable no-unused-vars */
import {
  User, Users as EntitiesUsers, UserInfo, ZacWork, Attribute,
} from '@/src/entities/Users';

export interface Users {
  create(email: string, password: string): Promise<User>;
  get(userId: string): Promise<UserInfo>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>
  putZacLogin(userId: string, userAttribute: Attribute): Promise<void>;
  putObcLogin(userId: string, userAttribute: Attribute): Promise<void>;
  register(props: ZacWork): Promise<void>;
}
