/* eslint-disable no-unused-vars */
import { WorkRecord } from '@/src/entities/dynamodb/works';

export interface Works {
  getWorkList(userId: string, yearMonth: number): Promise<WorkRecord[]>;
  get(userId: string, day: Date): Promise<WorkRecord>;
}
