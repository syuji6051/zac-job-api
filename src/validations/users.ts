import ajv from '@/lib/ajv';
import putZacLoginJson from '@/schemas/Users/PutZacLogin.json';

const putZacLoginValidateFunc = ajv.compile(
  putZacLoginJson,
);

export {
  // eslint-disable-next-line import/prefer-default-export
  putZacLoginValidateFunc,
};
