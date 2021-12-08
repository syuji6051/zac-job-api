/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';
import { SetUserAttributeInput, ActionEventsInput } from '@/src/usecases/inputs/slack';
import { SetUserAttributeOutput, ActionEventsOutput } from '@/src/usecases/outputs/slack';

export interface Slack {
  setUserAttributes(
    input: SetUserAttributeInput, output: SetUserAttributeOutput
  ): Promise<APIGatewayProxyResult>;

  actionEvents(
    input: ActionEventsInput, output: ActionEventsOutput
  ): Promise<APIGatewayProxyResult>
}
