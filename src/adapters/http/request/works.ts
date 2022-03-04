import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { validation, errors } from '@syuji6051/zac-job-library';
import camelcaseKeys from 'camelcase-keys';

import { SyncObcWorksInput as ISyncObcWorksInput, GetWorkListInput as IGetWorkListInput } from '@/src/usecases/inputs/works';
import { obcPunchWorkRequestFunc, syncObcWorksRequestFunc } from '@/src/validations/works';
import { PunchWork } from '@/src/entities/works';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';

export class SyncObcWorksInput extends EventV2Authorizer implements ISyncObcWorksInput {
  private yearMonth: number;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, queryStringParameters: query = {} } = event;
    super(authorizer);
    validation.check(syncObcWorksRequestFunc, query);
    this.yearMonth = Number(query.year_month);
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
    validation.check(syncObcWorksRequestFunc, query);
    this.yearMonth = Number(query.year_month);
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
    const data = JSON.parse(body);
    validation.check(obcPunchWorkRequestFunc, data);
    this.data = camelcaseKeys(JSON.parse(body));
  }

  getContent() {
    return this.data;
  }
}
