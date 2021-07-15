import {
  table, hashKey, rangeKey, attribute,
} from '@aws/dynamodb-data-mapper-annotations';

const { STAGE } = process.env;

@table(`zac-job-work-results-table-${STAGE}`)
// eslint-disable-next-line import/prefer-default-export
export class WorkRecord {
  @hashKey({
    attributeName: 'user_id',
    keyType: 'HASH',
  })
  userId: string;

  @rangeKey({
    type: 'Date',
    attributeName: 'day',
    keyType: 'RANGE',
  })
  day: Date;

  @attribute({ attributeName: 'clock_in' })
  clockIn?: string | null;

  @attribute({ attributeName: 'clock_out' })
  clockOut?: string | null;

  @attribute({ attributeName: 'returned1' })
  returned1?: string | null;

  @attribute({ attributeName: 'go_out1' })
  goOut1?: string | null;

  @attribute({ attributeName: 'returned2' })
  returned2?: string | null;

  @attribute({ attributeName: 'go_out2' })
  goOut2?: string | null;

  @attribute({ attributeName: 'returned3' })
  returned3?: string | null;

  @attribute({ attributeName: 'go_out3' })
  goOut3?: string | null;

  @attribute({ attributeName: 'flex_total_time' })
  flexTotalTime?: string | null;
}
