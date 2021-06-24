import { getAjv } from '@syuji6051/zac-job-library';
import zacRegisterWorks from '@/src/validations/schema/zac-register-works.json';

const ajv = getAjv({ removeAdditional: true });
const registerWorks = ajv.compile(zacRegisterWorks);

export {
  // eslint-disable-next-line import/prefer-default-export
  registerWorks,
};
