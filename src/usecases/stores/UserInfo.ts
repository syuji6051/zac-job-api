/* eslint-disable no-unused-vars */
import { UserInfo } from '@/entities/Users';

export interface Users {
  get(userId: string): Promise<UserInfo>;
}
