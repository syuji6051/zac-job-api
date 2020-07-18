import * as cdk from '@aws-cdk/core';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import Policy from './policy';

export default class LambdaBasicRole {
  constructor(scope: cdk.Construct) {
    const policy = new Policy(scope);

    const serviceRole = new Role(scope, 'lambda-basic-role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'lambda-basic-role',
    });
    serviceRole.attachInlinePolicy(policy.getBasicPolicy());
    serviceRole.attachInlinePolicy(policy.getDynamoDBPolicy())
    return serviceRole;
  }
}