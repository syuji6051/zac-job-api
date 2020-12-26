/* eslint-disable no-unused-vars */
import {
  User, Users as EntitiesUsers, UserInfo, ZacWork,
} from '@/entities/Users';

export interface Users {
  create(email: string, password: string): Promise<User>;
  get(userId: string): Promise<UserInfo>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>
  putZacLogin(
    userName: string, zacLoginId: string, zacPassword: string
  ): Promise<void>;
  putObcLogin(
    userName: string, obcLoginId: string, obcPassword: string
  ): Promise<void>;
  register(props: ZacWork): Promise<void>;
}