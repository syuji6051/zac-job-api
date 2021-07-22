import mapper from '@/src/database/dynamo-mapper';
import { ZacWorkCodeRecord } from '@/src/entities/dynamodb/zac-work-code';
import { WorkCode } from '@/src/entities/zac';

// eslint-disable-next-line import/prefer-default-export
export class ZacWorkCode {
  public async get(userId: string, yearMonth: number): Promise<WorkCode[]> {
    // eslint-disable-next-line new-parens
    const { codeList } = await mapper.get(Object.assign(new ZacWorkCodeRecord, {
      userId, yearMonth,
    }));
    return codeList;
  }

  public async set(userId: string, yearMonth: number, workCodeList: WorkCode []) {
    const toSave = Object.assign(new ZacWorkCodeRecord(), {
      userId,
      yearMonth,
      codeList: workCodeList,
    });
    await mapper.put(toSave);
  }
}
