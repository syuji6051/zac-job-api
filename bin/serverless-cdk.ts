#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
// import { AdminCognitoUserCdkStack } from '../lib/serverless-cdk-stack';
import { ZacJobManagementCdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
// new AdminCognitoUserCdkStack(app, 'AdminCognitoUserCdkStack');
new ZacJobManagementCdkStack(app, 'ZacJobManagementCdkStack');
