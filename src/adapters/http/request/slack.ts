import { SNSEventRecord } from 'aws-lambda';
import { slack } from '@syuji6051/zac-job-interface';
import { errors, logger, validation } from '@syuji6051/zac-job-library';

import {
  SetUserAttributeRequest, EventActionRequest, zSetUserAttributeRequest, LambdaEventHeaders,
} from '@/src/entities/slack';
import {
  SetUserAttributeInput as ISetUserAttributeInput,
  ActionEventsInput as IActionEventsInput,
  BotMessageInput as IBotMessageInput,
} from '@/src/usecases/inputs/slack';
import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { PublishSnsToSlackMessages } from '@/src/entities/sns';

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
    validation.check(zSetUserAttributeRequest, data);
    this.code = data.code;
  }

  getCode() {
    return this.code;
  }
}

export class ActionEventsInput implements IActionEventsInput {
  request: EventActionRequest;

  slackRetryNum: number;

  obcWorkDryRun: boolean;

  constructor(headers?: LambdaEventHeaders, body?: string | null) {
    if (body == null) {
      throw new errors.ValidationError('body is required');
    }
    const slackRetryNum = headers !== undefined ? headers['x-slack-retry-num'] : 0;
    this.slackRetryNum = typeof slackRetryNum === 'string' ? Number(slackRetryNum) : 0;
    this.obcWorkDryRun = headers !== undefined ? headers['x-zac-job-obc-dry-run'] === 'true' : false;

    const data = JSON.parse(body) as EventActionRequest;
    logger.debug(JSON.stringify(data));
    this.request = data;
  }

  getRequest() {
    return this.request;
  }

  getRetryNum() {
    return this.slackRetryNum;
  }

  getObcDryRun() {
    return this.obcWorkDryRun;
  }
}

export class BotMessageInput implements IBotMessageInput {
  input: PublishSnsToSlackMessages;

  constructor(body: SNSEventRecord[]) {
    const messages = body.map((event) => JSON.parse(event.Sns.Message));
    const results = validation.check(slack.zPublishSnsToSlackMessage.array(), messages);
    this.input = results;
  }

  getInput(): PublishSnsToSlackMessages {
    return this.input;
  }
}
