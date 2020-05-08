import * as cdk from '@aws-cdk/core';
import { Role, ServicePrincipal, ManagedPolicy, PolicyStatement, Policy } from "@aws-cdk/aws-iam";

export default class Iam {
  private scope: cdk.Construct;
  constructor(scope: cdk.Construct) {
    this.scope = scope;
  }
  createIamRoleAppSyncDynamoDb() {
    const iamRole = new Role(this.scope, 'dataSourceIamRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com')
    });
    iamRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'))
    return iamRole;
  };
  createLambdaCognitoIamRole() {
    const cognitoAllowPolicy = new PolicyStatement({
      resources: ['*'],
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "cognito-idp:*"
      ]
    });

    const policy = new Policy(this.scope, 'allow-lambda-cognito-policy', {
      policyName: 'allow-lambda-cognito-policy',
      statements: [cognitoAllowPolicy],
    });

    const serviceRole = new Role(this.scope, 'lambda-cognito-role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'lambda-cognito-role',
    });
    serviceRole.attachInlinePolicy(policy);
    return serviceRole;
  }
}