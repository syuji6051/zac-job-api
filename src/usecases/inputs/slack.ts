import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { EventActionRequest } from '@/src/entities/slack';

export interface SetUserAttributeInput extends EventV2Authorizer {
  getCode(): string;
}

export interface ActionEventsInput {
  getRequest(): EventActionRequest
}
