import moment from 'moment';
import {
  table, hashKey, rangeKey, attribute,
} from '@aws/dynamodb-data-mapper-annotations';
import { Work as IWork } from '@/src/entities/Works';
import mapper from '@/src/database/dynamo-mapper';

@table('UserWork')
export class WorkRecord {
  @hashKey()
  userId: string;

  @rangeKey()
  day: Date;

  @attribute()
  clockIn: string;

  @attribute()
  clockOut: string;

  @attribute()
  returned1: string;

  @attribute()
  goOut1: string;

  @attribute()
  returned2: string;

  @attribute()
  goOut2: string;

  @attribute()
  returned3: string;

  @attribute()
  goOut3: string;
}

export class Work {
  public async setWork(userId: string, works: IWork[]): Promise<void> {
    const toSave = works.map((work) => Object.assign(new WorkRecord(), {
      userId,
      day: moment(work.day, 'YYYYMMDD').toDate(),
      clockIn: work.clockIn,
      clockOut: work.clockOut,
      returned1: work.returned1,
      goOut1: work.goOut1,
      returned2: work.returned2,
      goOut2: work.goOut2,
      returned3: work.returned3,
      goOut3: work.goOut3,
    }));
    for await (const persisted of mapper.batchPut(toSave)) {
      console.log('work batch put success', persisted);
    }
  }
}

// function emptyStrToUndef(str: string) {
//   return str !== '' ? str : undefined;
// }
