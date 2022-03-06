/* eslint-disable no-unused-vars */
import { ZacRegisterParams } from '@syuji6051/zac-client';

import { WorkCode } from '@/src/entities/zac';
import { WorkRecord } from '@/src/entities/dynamodb/works';

interface Zac {
  convertToZacWork(inputDay: Date, work: WorkRecord, defaultWorkCode: string): ZacRegisterParams;
  getWorkCodeList(userId: string, yearMonth: number): Promise<WorkCode []>;
  setWorkCodeList(userId: string, yearMonth: number, workCodeList: WorkCode[]): Promise<void>;
}

export default Zac;
