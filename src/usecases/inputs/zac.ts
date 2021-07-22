import { WorkCode } from '@/src/entities/zac';
import { Authorizer } from '@/src/usecases/inputs/users';

export interface RegisterWorksInput extends Authorizer {
  getDay(): Date;
}

export interface GetWorkCodeListInput extends Authorizer {
  getYearMonth(): number;
}

export interface SetWorkCodeListInput extends Authorizer {
  getYearMonth(): number;
  getWorkCodeList(): WorkCode[]
}
