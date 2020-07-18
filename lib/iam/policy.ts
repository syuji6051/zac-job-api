import * as cdk from '@aws-cdk/core';
import { Policy as CdkPolicy, PolicyStatement, Effect } from '@aws-cdk/aws-iam';

export default class Policy {
  scope: cdk.Construct;
  constructor(scope: cdk.Construct) {
    this.scope = scope;
  }

  getBasicPolicy() {
    return new CdkPolicy(this.scope, 'allow-lambda-basic-role-policy', {
      policyName: 'allow-lambda-basic-policy',
      statements: [
        new PolicyStatement({
          resources: ['*'],
          actions: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",      
          ]
        })
      ],
    });
  }

  getDynamoDBPolicy() {
    return new CdkPolicy(this.scope, 'allow-lambda-dynamodb-role-policy', {
      policyName: 'allow-lambda-dynamodb-role-policy',
      statements: [
        new PolicyStatement({
          resources: ['*'],
          actions: [
            "dynamodb:BatchGet*",
            "dynamodb:DescribeStream",
            "dynamodb:DescribeTable",
            "dynamodb:Get*",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:BatchWrite*",
            "dynamodb:CreateTable",
            "dynamodb:Delete*",
            "dynamodb:Update*",
            "dynamodb:PutItem"
          ],
          effect: Effect.ALLOW,
        })],
    });
  }
}