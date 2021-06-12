/* eslint-disable no-unused-vars */
import { UserInfo } from '@/src/entities/users';

export interface Users {
  get(userId: string): Promise<UserInfo>;
}
