import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { PunchWork } from '@/src/entities/works';

export interface WorkInput {
  getUserId(): string;
}

export interface WorkListInput extends WorkInput {
  getYearMonth(): string;
}

export interface PunchWorkInput extends EventV2Authorizer {
  getContent(): PunchWork;
}
