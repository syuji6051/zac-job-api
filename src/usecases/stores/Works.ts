/* eslint-disable no-unused-vars */
import { Work } from '@/src/entities/Works';

export interface Works {
  list(userId: string, password: string, yearMonth: string): Promise<Work[]>;
  put(userId: string, work: Work[]): Promise<void>;
  clockIn(userId: string, password: string): Promise<void>;
  clockOut(userId: string, password: string): Promise<void>;
  goOut(userId: string, password: string): Promise<void>;
  goReturn(userId: string, password: string): Promise<void>;
}
