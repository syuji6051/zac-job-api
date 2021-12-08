import { APIGatewayProxyResult } from 'aws-lambda';
import { views } from '@syuji6051/zac-job-library';

import {
  SetUserAttributeOutput as ISetUserAttributeOutput,
  ActionEventsOutput as IActionEventsOutput,
} from '@/src/usecases/outputs/slack';
import { EventActionResponse } from '@/src/entities/slack';

export class SetUserAttributeOutput implements ISetUserAttributeOutput {
  public success(): APIGatewayProxyResult {
    return views.success();
  }
}

export class ActionEventOutput implements IActionEventsOutput {
  public success(res: EventActionResponse) :APIGatewayProxyResult {
    return views.success(res);
  }
}
