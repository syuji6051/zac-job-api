import { getAjv } from '@syuji6051/zac-job-library';
import workSyncRequest from '@/src/validations/schema/work-sync-request-parameter.json';

const ajv = getAjv({ removeAdditional: true });
const workSyncRequestFunc = ajv.compile(workSyncRequest);

export {
  // eslint-disable-next-line import/prefer-default-export
  workSyncRequestFunc,
};
