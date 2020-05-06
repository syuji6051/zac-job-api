import * as cdk from '@aws-cdk/core';
import { UserPool } from '@aws-cdk/aws-cognito';
import { GraphQLApi, MappingTemplate } from '@aws-cdk/aws-appsync';
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'

import { definition, tableName } from './schema';
import { Role, ServicePrincipal, ManagedPolicy } from '@aws-cdk/aws-iam';

export class AppSyncCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dataSourceIamRole = new Role(this, 'dataSourceIamRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com')
    });
    dataSourceIamRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'))

    const userInfoTable = new Table(this, 'UserInfo', {
      partitionKey: {
        name: 'userId',
        type: AttributeType.STRING
      },
      tableName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const userPool = UserPool.fromUserPoolId(this, 'UserPool', 'ap-northeast-1_o2nkpklQf');

    const graphQLApi = new GraphQLApi(this, 'ZacWorkManagement', {
      name: 'Zac-Work-Management',
      authorizationConfig: {
        defaultAuthorization: {
          userPool,
          appIdClientRegex: '2jgstgno1cjsaic2ftu6d2tu68',
          defaultAction: 'ALLOW'
        },
      },
      schemaDefinition: definition,
    });
    const dataSource = graphQLApi.addDynamoDbDataSource('UserInfo', '', userInfoTable);

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

const app = new cdk.App();
new AppSyncCdkStack(app, 'AppSyncCdkStack');
app.synth()
