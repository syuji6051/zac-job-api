import Ajv from 'ajv';

interface Users {
  putZacLogin(): Ajv.ValidateFunction
}

export default Users;
