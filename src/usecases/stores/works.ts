/* eslint-disable no-unused-vars */
import { WorkRecord } from '@/src/entities/dynamodb/works';
import { Work, WorkType } from '@/src/entities/works';

export interface Works {
  obcWorkList(userId: string, yearMonth: string): Promise<Work[]>;
  workList(userId: string, yearMonth: string): Promise<WorkRecord[]>;
  get(userId: string, day: Date): Promise<WorkRecord>;
  put(userId: string, work: Work[]): Promise<void>;
  clockIn(userId: string): Promise<void>;
  clockOut(userId: string): Promise<void>;
  workPunch(userId: string, workType: WorkType): Promise<void>;
  goOut(userId: string): Promise<void>;
  goReturn(userId: string): Promise<void>;
}
