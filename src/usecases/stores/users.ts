/* eslint-disable no-unused-vars */
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';
import {
  User, Users as EntitiesUsers, Attribute, UserInfo,
} from '@/src/entities/users';

export interface Users {
  create(email: string, password: string): Promise<User>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>;
  getUserInfo(userId: string): Promise<UserInfo>;
  setAttribute(user: UserAttributesRecord): Promise<void>
  getUserFromSlackId(slackUserId: string): Promise<UserAttributesRecord | undefined>
}
