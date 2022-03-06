import { APIGatewayProxyEventV2 } from 'aws-lambda';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { errors, logger, validation } from '@syuji6051/zac-job-library';

import { EventV2Authorizer } from '@/src/adapters/http/request/authorizer';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { RegisterWorksRequest, SetWorkCodeListRequest, WorkCode } from '@/src/entities/zac';
import { registerWorks, getWorkCodeListValidation, setWorkCodeListValidation } from '@/src/validations/zac';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Tokyo');

export class RegisterWorkInput extends EventV2Authorizer {
  protected authorizer?: APIGatewayProxyEventV2Authorizer;

  registerWorks: RegisterWorksRequest;

  public constructor(event: APIGatewayProxyEventV2) {
    const { requestContext: { authorizer }, queryStringParameters: query = {} } = event;
    super(authorizer);
    validation.check(registerWorks, query);
    this.registerWorks = {
      day: dayjs.utc(query!.day, 'YYYY/MM/DD').toDate(),
    };
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
    try {
      validation.check(getWorkCodeListValidation, query);
    } catch (err) {
      if (err instanceof Error) {
        throw new errors.ValidationError(err.message);
      }
    }
    this.yearMonth = Number(query?.year_month);
  }

  public getUserId(): string {
    return this.getUserName();
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
    const data = JSON.parse(body) as SetWorkCodeListRequest;
    logger.info(`body data=${JSON.stringify(data)}`);
    validation.check(setWorkCodeListValidation, data);
    this.yearMonth = data.year_month;
    this.workCodeList = data.code_list;
  }

  public getUserId(): string {
    return this.getUserName();
  }

  public getYearMonth() {
    return this.yearMonth;
  }

  public getWorkCodeList() {
    return this.workCodeList;
  }
}
