import {
  table, hashKey, rangeKey, attribute,
} from '@aws/dynamodb-data-mapper-annotations';
import { WorkCode } from '@/src/entities/zac';

const { STAGE } = process.env;

@table(`zac-job-work-code-table-${STAGE}`)
// eslint-disable-next-line import/prefer-default-export
export class ZacWorkCodeRecord {
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
