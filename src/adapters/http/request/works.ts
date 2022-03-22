import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { validation, errors } from '@syuji6051/zac-job-library';
import camelcaseKeys from 'camelcase-keys';

import { SyncObcWorksInput as ISyncObcWorksInput, GetWorkListInput as IGetWorkListInput } from '@/src/usecases/inputs/works';
import { PunchWork, zPunchWork, zSyncObcWorksRequest } from '@/src/entities/works';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';

export class SyncObcWorksInput extends EventV2Authorizer implements ISyncObcWorksInput {
  private yearMonth: number;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, queryStringParameters: query = {} } = event;
    super(authorizer);
    const data = validation.check(zSyncObcWorksRequest, camelcaseKeys(query));
    this.yearMonth = Number(data.yearMonth);
  }

  getYearMonth() {
    return this.yearMonth;
  }
}

export class GetWorkListInput extends EventV2Authorizer implements IGetWorkListInput {
  private yearMonth: number;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, queryStringParameters: query = {} } = event;
    super(authorizer);
    const data = validation.check(zSyncObcWorksRequest, camelcaseKeys(query));
    this.yearMonth = Number(data.yearMonth);
  }

  getYearMonth() {
    return this.yearMonth;
  }
}

export class PunchWorkInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  data: PunchWork;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, body } = event;
    super(authorizer);
    if (body == null) throw new errors.ValidationError('body is required');
    const data = validation.check(zPunchWork, camelcaseKeys(JSON.parse(body)));
    this.data = data;
  }

  getContent() {
    return this.data;
  }
}
