/* eslint-disable no-unused-vars */
import { WorkRecord } from '@/src/entities/dynamodb/works';
import { Work } from '@/src/entities/works';

export interface Works {
  obcWorkList(userId: string, yearMonth: string): Promise<Work[]>;
  workList(userId: string, yearMonth: string): Promise<WorkRecord[]>;
  put(userId: string, work: Work[]): Promise<void>;
  clockIn(userId: string): Promise<void>;
  clockOut(userId: string): Promise<void>;
  goOut(userId: string): Promise<void>;
  goReturn(userId: string): Promise<void>;
}
