import * as cdk from '@aws-cdk/core';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'

import { UserInfoTable, UserWorkTable } from './schema';

export function createUserInfoTable(scope: cdk.Construct) {
  return new Table(scope, 'UserInfo', {
    partitionKey: {
      name: 'userId',
      type: AttributeType.STRING
    },
    tableName: UserInfoTable,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  });
}

export function createUserWorkTable(scope: cdk.Construct) {
  return new Table(scope, 'UserWork', {
    partitionKey: {
      name: 'userId',
      type: AttributeType.STRING
    },
    sortKey: {
      name: 'day',
      type: AttributeType.NUMBER
    },
    tableName: UserWorkTable,
    removalPolicy: cdk.RemovalPolicy.DESTROY
  });
}