import { errors, logger, validation } from '@syuji6051/zac-job-library';

import { SetUserAttributeRequest, EventActionRequest } from '@/src/entities/slack';
import {
  SetUserAttributeInput as ISetUserAttributeInput,
  ActionEventsInput as IActionEventsInput,
  BotMessageInput as IBotMessageInput,
} from '@/src/usecases/inputs/slack';
import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { BotMessagesRequestValidationFunc, SetUserAttributeValidateFunc } from '@/src/validations/slack';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { BotMessage } from '@/src/entities/sns';
import { SNSEventRecord } from 'aws-lambda';

// eslint-disable-next-line import/prefer-default-export
export class SetUserAttributeInput
  extends EventV2CognitoAuthorizer implements ISetUserAttributeInput {
  code: string;

  public constructor(
    authorizer: APIGatewayProxyEventV2Authorizer | undefined,
    body: string | undefined,
  ) {
    super(authorizer);
    if (body == null) {
      throw new errors.ValidationError('code is required');
    }
    const data = JSON.parse(body) as SetUserAttributeRequest;
    validation.check(SetUserAttributeValidateFunc, data);
    this.code = data.code;
  }

  getCode() {
    return this.code;
  }
}

export class ActionEventsInput implements IActionEventsInput {
  request: EventActionRequest;

  constructor(body: string | null) {
    if (body == null) {
      throw new errors.ValidationError('body is required');
    }
    const data = JSON.parse(body) as EventActionRequest;
    logger.debug(JSON.stringify(data));
    // validation.check(EventActionRequestValidateFunc, data);
    this.request = data;
  }

  getRequest() {
    return this.request;
  }
}

export class BotMessageInput implements IBotMessageInput {
  input: BotMessage[];

  constructor(body: SNSEventRecord[]) {
    const messages = body.map((event) => JSON.parse(event.Sns.Message));
    validation.check(BotMessagesRequestValidationFunc, messages);
    this.input = messages as BotMessage [];
  }

  getInput(): BotMessage[] {
    return this.input;
  }
}
