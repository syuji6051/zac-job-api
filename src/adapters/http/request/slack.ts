import { errors, logger, validation } from '@syuji6051/zac-job-library';

import { SetUserAttributeRequest, EventActionRequest } from '@/src/entities/slack';
import {
  SetUserAttributeInput as ISetUserAttributeInput,
  ActionEventsInput as IActionEventsInput,
} from '@/src/usecases/inputs/slack';
import { APIGatewayProxyCognitoAuthorizer } from 'aws-lambda';
import { CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { SetUserAttributeValidateFunc } from '@/src/validations/slack';

// eslint-disable-next-line import/prefer-default-export
export class SetUserAttributeInput extends CognitoAuthorizer implements ISetUserAttributeInput {
  code: string;

  public constructor(
    authorizer: APIGatewayProxyCognitoAuthorizer,
    body: string | null,
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
