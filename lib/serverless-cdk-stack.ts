import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { Duration } from '@aws-cdk/core';
import { PolicyStatement, Policy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';

export class AdminCognitoUserCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const iamApiUserCreate = new PolicyStatement({
      resources: ['*'],
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "cognito-idp:*"
      ]
    });

    const policy = new Policy(this, 'allow-lambda-cognito-policy', {
      policyName: 'allow-lambda-cognito-policy',
      statements: [iamApiUserCreate],
    });

    const serviceRole = new Role(this, 'lambda-cognito-role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'lambda-cognito-role',
    });
    serviceRole.attachInlinePolicy(policy);

    const apiUserCreate = new NodejsFunction(this, 'api-user-create', {
      functionName: 'api-user-create',
      entry: 'app/http/handlers/users.ts',
      handler: 'create',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.seconds(3),
      environment: {
        REGION: props ? props.env!.region! : 'ap-northeast-1'
      },
      role: serviceRole
    });

    const apiUserList = new NodejsFunction(this, 'api-user-list', {
      functionName: 'api-user-list',
      entry: 'app/http/handlers/users.ts',
      handler: 'list',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.seconds(3),
      environment: {
        REGION: props ? props.env!.region! : 'ap-northeast-1'
      },
      role: serviceRole
    });

    const apiWorkList = new NodejsFunction(this, 'api-work-list', {
      functionName: 'api-work-list',
      entry: 'app/http/handlers/works.ts',
      handler: 'workList',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.seconds(30),
      role: Role.fromRoleArn(this, id, 'arn:aws:iam::105785188161:role/lambda-basic-role')
    })

    const api = new apigateway.RestApi(this, 'itemsApi', {
      restApiName: 'admin-cognito-user'
    });

    const userAddResource = api.root.addResource('user');
    const userListResource = api.root.addResource('users');
    const workListResource = api.root.addResource('works');

    const postApiUserCreateIntegration = new apigateway.LambdaIntegration(
      apiUserCreate,
      {
        proxy: true,
      }
    );

    userAddResource.addMethod(
      'POST',
      postApiUserCreateIntegration,
      { methodResponses: [{ statusCode: '200', }] });

    const getApiUsersListIntegration = new apigateway.LambdaIntegration(
      apiUserList,
      {
        proxy: true,
      }
    );

    userListResource.addMethod(
      'GET',
      getApiUsersListIntegration,
      { methodResponses: [{ statusCode: '200', }] });

    const getApiWorkListIntegration = new apigateway.LambdaIntegration(
      apiWorkList,
      { proxy: true }
    );

    workListResource.addMethod(
      'GET',
      getApiWorkListIntegration,
      { methodResponses: [{ statusCode: '200' }] }
    );
  }
}

const app = new cdk.App();
new AdminCognitoUserCdkStack(app, 'AdminCognitoUserCdkApp');
app.synth()
