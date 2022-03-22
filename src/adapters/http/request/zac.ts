import { APIGatewayProxyEventV2 } from 'aws-lambda';
import camelcaseKeys from 'camelcase-keys';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { errors, validation } from '@syuji6051/zac-job-library';

import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import {
  RegisterWorksRequest,
  WorkCode, zGetWorkCodeListRequest, zRegisterWorksRequest, zSetWorkCodeListRequest,
} from '@/src/entities/zac';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Tokyo');

export class RegisterWorkInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  registerWorks: RegisterWorksRequest;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, queryStringParameters: query = {} } = event;
    super(authorizer);
    validation.check(zRegisterWorksRequest, {
      ...query,
      day: dayjs.utc(query?.day, 'YYYY/MM/DD').toDate(),
    });
  }

  public getDay() {
    return this.registerWorks.day;
  }
}

export class GetWorkCodeListInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  yearMonth: number;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, queryStringParameters: query } = event;
    super(authorizer);
    if (query == null) throw new errors.ValidationError('query is required');
    const data = validation.check(zGetWorkCodeListRequest, camelcaseKeys(query));
    this.yearMonth = Number(data.yearMonth);
  }

  public getYearMonth() {
    return this.yearMonth;
  }
}

export class SetWorkCodeListInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  yearMonth: number

  workCodeList: WorkCode[]

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, body } = event;
    super(authorizer);
    if (body == null) throw new errors.ValidationError('body is required');
    const data = validation.check(zSetWorkCodeListRequest, camelcaseKeys(JSON.parse(body)));
    this.yearMonth = data.yearMonth;
    this.workCodeList = data.codeList;
  }

  public getYearMonth() {
    return this.yearMonth;
  }

  public getWorkCodeList() {
    return this.workCodeList;
  }
}
