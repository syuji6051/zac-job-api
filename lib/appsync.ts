import * as cdk from '@aws-cdk/core';
import { IUserPool, UserPool } from '@aws-cdk/aws-cognito';
import { Table } from '@aws-cdk/aws-dynamodb';
import { GraphQLApi, MappingTemplate } from '@aws-cdk/aws-appsync';

import { definition } from './schema';

export default class AppSync {
  private scope: cdk.Construct;
  private userPool: IUserPool;
  private table: Table;
  constructor(scope: cdk.Construct, table: Table) {
    this.scope = scope;
    this.userPool = UserPool.fromUserPoolId(this.scope, 'UserPool', 'ap-northeast-1_o2nkpklQf');
    this.table = table;
  }
  createAppSyncZacWorkManagement() {
    const graphQLApi = new GraphQLApi(this.scope, 'ZacWorkManagement', {
      name: 'Zac-Work-Management',
      authorizationConfig: {
        defaultAuthorization: {
          userPool: this.userPool,
          appIdClientRegex: '2jgstgno1cjsaic2ftu6d2tu68',
          defaultAction: 'ALLOW'
        },
      },
      schemaDefinition: definition,
    });
    const dataSource = graphQLApi.addDynamoDbDataSource('UserInfo', '', this.table);

    dataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'setObcAuthentication',
      requestMappingTemplate: MappingTemplate.fromString(`
          #set($username = $context.identity.username)
          #set($obcUserId = $context.args.obcUserId)
          #set($obcPassword = $context.args.obcPassword)
    
          {
            "version": "2017-02-28",
            "operation": "PutItem",
            "key": {
              "userId": $util.dynamodb.toDynamoDBJson($username)
            },
            "attributeValues":$util.dynamodb.toMapValuesJson($ctx.args)
          }`),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });

    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getObcAuthentication',
      requestMappingTemplate: MappingTemplate.fromString(`
          {
            "version": "2017-02-28",
            "operation": "GetItem",
            "key": {
                "userId": $util.dynamodb.toDynamoDBJson($ctx.identity.username),
            }
          }
          `),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    });
  }
}