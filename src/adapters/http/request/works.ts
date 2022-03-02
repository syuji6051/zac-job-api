import { APIGatewayProxyEventQueryStringParameters, APIGatewayProxyEventV2 } from 'aws-lambda';
import { validation, errors } from '@syuji6051/zac-job-library';
import camelcaseKeys from 'camelcase-keys';

import { WorkListInput as IWorkListInput } from '@/src/usecases/inputs/works';
import { obcPunchWorkRequestFunc, workSyncRequestFunc } from '@/src/validations/works';
import { PunchWork, WorkSyncRequest } from '@/src/entities/works';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';

export class WorkInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  public getUserId(): string {
    return this.getUserName();
  }
}

export class WorkListInput extends WorkInput implements IWorkListInput {
  private workSyncRequest: WorkSyncRequest;

  public constructor(
    authorizer: APIGatewayProxyEventV2Authorizer | undefined,
    query: APIGatewayProxyEventQueryStringParameters | null = {},
  ) {
    super(authorizer);
    try {
      validation.check(workSyncRequestFunc, query);
    } catch (err) {
      if (err instanceof Error) {
        throw new errors.ValidationError(err.message);
      }
      throw err;
    }
    this.workSyncRequest = camelcaseKeys(query!) as unknown as WorkSyncRequest;
  }

  public getYearMonth(): string {
    return this.workSyncRequest.yearMonth;
  }
}

export class PunchWorkInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  data: PunchWork;

  public constructor(
    event: APIGatewayProxyEventV2,
  ) {
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
