import { CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { EventActionRequest } from '@/src/entities/slack';

export interface SetUserAttributeInput extends CognitoAuthorizer {
  getCode(): string;
}

export interface ActionEventsInput {
  getRequest(): EventActionRequest
}
