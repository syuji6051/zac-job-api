/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { middleware } from '@syuji6051/zac-job-library';
import {
  setUserAttribute, actionEvents, botMessage,
} from '@/src/handlers/slack';

const router = express.Router();

router.post('/slack/auth', middleware.apiGatewayV2EventGenerator());
router.post('/slack/auth', middleware.lambdaCognitoAuthorizerDriver(setUserAttribute));

router.post('/slack/action-events', middleware.apiGatewayV2EventGenerator());
router.post('/slack/action-events', middleware.lambdaCognitoAuthorizerDriver(actionEvents));

router.post('/sns/slack/messages', middleware.snsEventGenerator());
router.post('/sns/slack/messages', middleware.lambdaDriver(botMessage));
export default router;
