import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { EventActionRequest } from '@/src/entities/slack';

export interface SetUserAttributeInput extends EventV2CognitoAuthorizer {
  getCode(): string;
}

export interface ActionEventsInput {
  getRequest(): EventActionRequest
}
