/* eslint-disable no-unused-vars */
import { WorkCode, ZacWork } from '@/src/entities/zac';

interface Zac {
  register(props: ZacWork): Promise<void>;
  getWorkCodeList(userId: string, yearMonth: number): Promise<WorkCode []>;
  setWorkCodeList(userId: string, yearMonth: number, workCodeList: WorkCode[]): Promise<void>;
}

export default Zac;
