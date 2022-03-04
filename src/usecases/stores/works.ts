/* eslint-disable no-unused-vars */
import { WorkRecord } from '@/src/entities/dynamodb/works';
import { Work, WorkType } from '@/src/entities/works';

export interface Works {
  getWorkList(userId: string, yearMonth: number): Promise<WorkRecord[]>;
  get(userId: string, day: Date): Promise<WorkRecord>;
  workPunch(userId: string, workType: WorkType): Promise<void>;
}
