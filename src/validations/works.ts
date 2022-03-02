import { getAjv } from '@syuji6051/zac-job-library';
import workSyncRequest from '@/src/validations/schema/work-sync-request-parameter.json';
import ObcPunchWorkRequestJson from '@/src/validations/schema/ObcPunchWorkRequest.json';

const ajv = getAjv({ removeAdditional: true });
const workSyncRequestFunc = ajv.compile(workSyncRequest);

const obcPunchWorkRequestFunc = ajv.compile(ObcPunchWorkRequestJson);
export {
  workSyncRequestFunc,
  obcPunchWorkRequestFunc,
};
