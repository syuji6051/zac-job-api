import ajv from '@/src/lib/ajv';
import putZacLoginJson from '@/src/schemas/Users/PutZacLogin.json';
import putObcLoginJson from '@/src/schemas/Users/PutObcLogin.json';
import zacWorkRegisterJson from '@/src/schemas/Users/ZacWorkRegister.json';

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
