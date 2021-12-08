/* eslint-disable no-unused-vars */
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';
import {
  User, Users as EntitiesUsers, Attribute,
} from '@/src/entities/users';

export interface Users {
  create(email: string, password: string): Promise<User>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>
  putZacLogin(userId: string, userAttribute: Attribute): Promise<void>;
  putObcLogin(userId: string, userAttribute: Attribute): Promise<void>;
  setAttribute(user: UserAttributesRecord): Promise<void>
  getUserFromSlackId(slackUserId: string): Promise<UserAttributesRecord | undefined>
}
