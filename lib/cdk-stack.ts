import * as cdk from '@aws-cdk/core';

import Iam from './iam';
import { createUserInfoTable, createUserWorkTable } from './dynamodb';
import AppSync from './appsync';
import Lambda from './lambda';
import APIGateway from './api-gateway';

export class ZacJobManagementCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iam = new Iam(this);
    iam.createIamRoleAppSyncDynamoDb();
    const cognitoRole = iam.createLambdaCognitoIamRole();

    const userInfoTable = createUserInfoTable(this);
    const userWorkTable = createUserWorkTable(this);
    const appSync = new AppSync(this, userInfoTable, userWorkTable);
    appSync.createAppSyncZacWorkManagement();



    const lambda = new Lambda(this);
    const lambdaUserCreate = lambda.createApiUserCreate(cognitoRole);
    const lambdaUserList = lambda.createApiUserList(cognitoRole);
    const lambdaWorkSync = lambda.createApiWorkSync();

    const apiGateway = new APIGateway(this);
    apiGateway.createGetApiUserList(lambdaUserList);
    apiGateway.createPostApiUserCreate(lambdaUserCreate);
    apiGateway.createPostApiWorkSync(lambdaWorkSync);
  }
}

const app = new cdk.App();
new ZacJobManagementCdkStack(app, 'ZacJobManagementCdkStack');
app.synth()
