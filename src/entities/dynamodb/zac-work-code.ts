import {
  table, hashKey, rangeKey, attribute,
} from '@aws/dynamodb-data-mapper-annotations';
import { WorkCode } from '@/src/entities/zac';

const { STAGE } = process.env;

@table(`zac-job-work-code-list-${STAGE}`)
export default class ZacWorkCodeRecord {
  @hashKey({
    attributeName: 'user_id',
    keyType: 'HASH',
  })
  userId: string;

  @rangeKey({
    type: 'Number',
    attributeName: 'year_month',
    keyType: 'RANGE',
  })
  yearMonth: number;

  @attribute({
    attributeName: 'code_list',
  })
  codeList: WorkCode[];
}
