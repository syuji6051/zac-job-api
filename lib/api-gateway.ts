import * as cdk from "@aws-cdk/core";
import * as apigateway from '@aws-cdk/aws-apigateway';
import { IFunction } from "@aws-cdk/aws-lambda";
import { AuthorizationType } from "@aws-cdk/aws-apigateway";
import { UserPool } from "@aws-cdk/aws-cognito";

export default class APIGateway {
  private scope: cdk.Construct;
  private restApi: apigateway.RestApi;
  private userAddResource: apigateway.Resource;
  private userListResource: apigateway.Resource;
  private worksResource: apigateway.Resource;
  private worksSyncResource: apigateway.Resource;
  private authorizer: apigateway.CfnAuthorizer;
  constructor(scope: cdk.Construct) {
    this.scope = scope;
    this.restApi = new apigateway.RestApi(this.scope, 'itemsApi', {
      restApiName: 'admin-cognito-user',
    });
    this.authorizer = new apigateway.CfnAuthorizer(this.scope, 'CfnAuthorizer', {
      name: 'cognito-authorizer',
      identitySource: 'method.request.header.Authorization',
      providerArns: [UserPool.fromUserPoolId(this.scope, 'CfnAuthorizerUserPool', 'ap-northeast-1_o2nkpklQf').userPoolArn],
      restApiId: this.restApi.restApiId,
      type: AuthorizationType.COGNITO,
    })
    this.userAddResource = this.restApi.root.addResource('user');
    this.userListResource = this.restApi.root.addResource('users');
    this.worksResource = this.restApi.root.addResource('works');
    this.worksSyncResource = this.worksResource.addResource('sync');
  }

  createPostApiUserCreate(lambda: IFunction) {
    const postApiUserCreateIntegration = new apigateway.LambdaIntegration(
      lambda,
      { proxy: true }
    );

    this.userAddResource.addMethod(
      'POST',
      postApiUserCreateIntegration,
      { methodResponses: [{ statusCode: '200', }] });
  }

  createGetApiUserList(lambda: IFunction) {
    const getApiUsersListIntegration = new apigateway.LambdaIntegration(
      lambda,
      {
        proxy: true,
      }
    );

    this.userListResource.addMethod(
      'GET',
      getApiUsersListIntegration,
      { methodResponses: [{ statusCode: '200', }] });
  }

  createPostApiWorkSync(lambda: IFunction) {
    const getApiWorkSyncIntegration = new apigateway.LambdaIntegration(
      lambda,
      { proxy: true }
    );

    this.worksSyncResource.addMethod(
      'POST',
      getApiWorkSyncIntegration,
      {
        authorizationType: apigateway.AuthorizationType.COGNITO,
        authorizer: { authorizerId: this.authorizer.ref },
        methodResponses: [{ statusCode: '200' }]
      }
    );
  }
}