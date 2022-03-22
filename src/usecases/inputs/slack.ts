import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { EventActionRequest } from '@/src/entities/slack';
import { PublishSnsToSlackMessages } from '@/src/entities/sns';

export interface SetUserAttributeInput extends EventV2CognitoAuthorizer {
  getCode(): string;
}

export interface ActionEventsInput {
  getRequest(): EventActionRequest
}

export interface BotMessageInput {
  getInput(): PublishSnsToSlackMessages
}
