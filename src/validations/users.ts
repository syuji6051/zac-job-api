import ajv from '@/lib/ajv';
import putZacLoginJson from '@/schemas/Users/PutZacLogin.json';
import putObcLoginJson from '@/schemas/Users/PutObcLogin.json';
import zacWorkRegisterJson from '@/schemas/Users/ZacWorkRegister.json';

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
