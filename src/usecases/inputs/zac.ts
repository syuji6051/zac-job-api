import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { WorkCode } from '@/src/entities/zac';

export interface RegisterWorksInput extends EventV2Authorizer {
  getDay(): Date;
}

export interface GetWorkCodeListInput extends EventV2Authorizer {
  getYearMonth(): number;
}

export interface SetWorkCodeListInput extends EventV2Authorizer {
  getYearMonth(): number;
  getWorkCodeList(): WorkCode[]
}
