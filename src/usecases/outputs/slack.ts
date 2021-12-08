/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';

import { EventActionResponse, UserInfo } from '@/src/entities/slack';

export interface SetUserAttributeOutput {
  success(user: UserInfo): APIGatewayProxyResult;
}

export interface ActionEventsOutput {
  success(res: EventActionResponse): APIGatewayProxyResult;
}
