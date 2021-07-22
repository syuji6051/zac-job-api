import { getAjv } from '@syuji6051/zac-job-library';
import zacRegisterWorks from '@/src/validations/schema/zac-register-works.json';
import getWorkCodeListJson from '@/src/validations/schema/zac-get-work-code-list.json';
import setWorkCodeListJson from '@/src/validations/schema/zac-set-work-code-list.json';

const ajv = getAjv({ removeAdditional: true });
const registerWorks = ajv.compile(zacRegisterWorks);
const getWorkCodeListValidation = ajv.compile(getWorkCodeListJson);
const setWorkCodeListValidation = ajv.compile(setWorkCodeListJson);

export {
  registerWorks,
  getWorkCodeListValidation,
  setWorkCodeListValidation,
};
