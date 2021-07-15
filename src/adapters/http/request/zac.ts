import { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { errors, validation } from '@syuji6051/zac-job-library';

import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/users';
import { RegisterWorksRequest } from '@/src/entities/zac';
import { registerWorks } from '@/src/validations/zac';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Tokyo');

// eslint-disable-next-line import/prefer-default-export
export class RegisterWorkInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  registerWorks: RegisterWorksRequest;

  public constructor(
    authorizer?: APIGatewayProxyEventV2Authorizer,
    query: APIGatewayProxyEventQueryStringParameters | null = {},
  ) {
    super(authorizer);
    try {
      console.log(query);
      validation.check(registerWorks, query);
    } catch (err) {
      throw new errors.ValidationError(err.message);
    }
    this.registerWorks = {
      day: dayjs.utc(query!.day, 'YYYY/MM/DD').toDate(),
    };
  }

  public getUserId(): string {
    return this.getUserName();
  }

  public getDay() {
    return this.registerWorks.day;
  }
}
