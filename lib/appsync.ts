import * as cdk from '@aws-cdk/core';
import { IUserPool, UserPool } from '@aws-cdk/aws-cognito';
import { Table } from '@aws-cdk/aws-dynamodb';
import { GraphQLApi, MappingTemplate, KeyCondition } from '@aws-cdk/aws-appsync';

import { definition } from './schema';

export default class AppSync {
  private scope: cdk.Construct;
  private userPool: IUserPool;
  private userInfoTable: Table;
  private userWorkTable: Table;
  constructor(scope: cdk.Construct, userInfoTable: Table, userWorkTable: Table) {
    this.scope = scope;
    this.userPool = UserPool.fromUserPoolId(this.scope, 'UserPool', 'ap-northeast-1_o2nkpklQf');
    this.userInfoTable = userInfoTable;
    this.userWorkTable = userWorkTable;
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
    const userInfoSource = graphQLApi.addDynamoDbDataSource('UserInfo', '', this.userInfoTable);
    const userWorkSource = graphQLApi.addDynamoDbDataSource('UserWork', '', this.userWorkTable);

    userInfoSource.createResolver({
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

    userInfoSource.createResolver({
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

    userWorkSource.createResolver({
      typeName: 'Query',
      fieldName: 'getUserWork',
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(
        KeyCondition.eq('userId', 'userId')
          .and(KeyCondition.between('day', 'start', 'end'))
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })
  }
}
