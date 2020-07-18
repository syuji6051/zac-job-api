import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Role } from '@aws-cdk/aws-iam';

export default class Lambda {
  private scope: cdk.Construct;
  constructor(scope: cdk.Construct) {
    this.scope = scope;
  }
  createApiUserCreate(iamRole: Role) {
    return new NodejsFunction(this.scope, 'api-user-create', {
      functionName: 'api-user-create',
      entry: 'app/http/handlers/users.ts',
      handler: 'create',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(3),
      environment: {
        COGNITO_USER_POOL: 'ap-northeast-1_o2nkpklQf'
      },
      role: iamRole,
      sourceMaps: true
    });
  }
  createApiUserList(iamRole: Role) {
    return new NodejsFunction(this.scope, 'api-user-list', {
      functionName: 'api-user-list',
      entry: 'app/http/handlers/users.ts',
      handler: 'list',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(3),
      environment: {
        COGNITO_USER_POOL: 'ap-northeast-1_o2nkpklQf'
      },
      role: iamRole,
      sourceMaps: true
    });
  }
  createApiWorkSync() {
    return new NodejsFunction(this.scope, 'api-work-sync', {
      functionName: 'api-work-sync',
      entry: 'app/http/handlers/works.ts',
      handler: 'workSync',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        COGNITO_USER_POOL: 'ap-northeast-1_o2nkpklQf'
      },
      role: Role.fromRoleArn(this.scope, 'createApiWorkSync', 'arn:aws:iam::105785188161:role/lambda-basic-role'),
      sourceMaps: true
    });
  }
  createApiClockIn() {
    return new NodejsFunction(this.scope, 'api-work-sync', {
      functionName: 'api-work-clock-in',
      entry: 'app/http/handlers/works.ts',
      handler: 'clockIn',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(30),
      role: Role.fromRoleArn(this.scope, 'createApiWorkSync', 'arn:aws:iam::105785188161:role/lambda-basic-role'),
      sourceMaps: true
    });
  }

}
