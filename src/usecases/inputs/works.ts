import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { PunchWork } from '@/src/entities/works';

export interface GetWorkListInput extends EventV2Authorizer {
  getYearMonth(): number;
}

export interface SyncObcWorksInput extends EventV2Authorizer {
  getYearMonth(): number;
}

export interface PunchWorkInput extends EventV2Authorizer {
  getContent(): PunchWork;
}
