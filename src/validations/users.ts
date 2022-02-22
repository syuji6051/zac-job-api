import { getAjv } from '@syuji6051/zac-job-library';
import putZacInfoJson from '@/src/validations/schema/PutZacInfoRequest.json';
import putObcInfoJson from '@/src/validations/schema/PutObcInfoRequest.json';
import zacWorkRegisterJson from '@/src/schemas/Users/ZacWorkRegister.json';

const ajv = getAjv({ removeAdditional: true });

const putZacInfoValidateFunc = ajv.compile(putZacInfoJson);

const putObcLoginValidateFunc = ajv.compile(putObcInfoJson);

const zacWorkRegisterFunc = ajv.compile(zacWorkRegisterJson);

export {
  putZacInfoValidateFunc,
  putObcLoginValidateFunc,
  zacWorkRegisterFunc,
};
