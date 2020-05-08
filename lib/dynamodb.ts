import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'

import { tableName } from './schema';

export function userInfoTable(scope: cdk.Construct) {
  return new Table(scope, 'UserInfo', {
    partitionKey: {
      name: 'userId',
      type: AttributeType.STRING
    },
    tableName,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  });
}
