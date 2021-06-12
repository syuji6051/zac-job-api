import { getAjv } from '@syuji6051/zac-job-library';
import putZacLoginJson from '@/src/schemas/Users/PutZacLogin.json';
import putObcLoginJson from '@/src/schemas/Users/PutObcLogin.json';
import zacWorkRegisterJson from '@/src/schemas/Users/ZacWorkRegister.json';

const ajv = getAjv({ removeAdditional: true });

const putZacLoginValidateFunc = ajv.compile(
  putZacLoginJson,
);

const putObcLoginValidateFunc = ajv.compile(
  putObcLoginJson,
);

const zacWorkRegisterFunc = ajv.compile(
  zacWorkRegisterJson,
);

export {
  putZacLoginValidateFunc,
  putObcLoginValidateFunc,
  zacWorkRegisterFunc,
};
