import { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import { validation, errors } from '@syuji6051/zac-job-library';
import camelcaseKeys from 'camelcase-keys';

import {
  WorkListInput as IWorkListInput,
} from '@/src/usecases/inputs/works';
import { workSyncRequestFunc } from '@/src/validations/works';
import { WorkSyncRequest } from '@/src/entities/works';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/users';
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
