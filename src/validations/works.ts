import { getAjv } from '@syuji6051/zac-job-library';
import SyncObcWorksRequestJson from '@/src/validations/schema/SyncObcWorksRequest.json';
import ObcPunchWorkRequestJson from '@/src/validations/schema/PunchWorkRequest.json';

const ajv = getAjv({ removeAdditional: true });
const syncObcWorksRequestFunc = ajv.compile(SyncObcWorksRequestJson);

const obcPunchWorkRequestFunc = ajv.compile(ObcPunchWorkRequestJson);
export {
  syncObcWorksRequestFunc,
  obcPunchWorkRequestFunc,
};
