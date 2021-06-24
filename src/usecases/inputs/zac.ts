import { Authorizer } from '@/src/usecases/inputs/users';

export interface RegisterWorksInput extends Authorizer {
  getDay(): Date;
}
