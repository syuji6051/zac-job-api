import ajv from '@/lib/ajv';
import putZacLoginJson from '@/schemas/Users/PutZacLogin.json';
import zacWorkRegisterJson from '@/schemas/Users/ZacWorkRegister.json';

const putZacLoginValidateFunc = ajv.compile(
  putZacLoginJson,
);

const zacWorkRegisterFunc = ajv.compile(
  zacWorkRegisterJson,
);

export {
  putZacLoginValidateFunc,
  zacWorkRegisterFunc,
};
