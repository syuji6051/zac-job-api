/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { middleware } from '@syuji6051/zac-job-library';
import {
  setUserAttribute, actionEvents,
} from '@/src/handlers/slack';

const router = express.Router();

router.post('/oauth/slack/attributes', middleware.apiGatewayCognitoEventGenerator());
router.post('/oauth/slack/attributes', middleware.lambdaCognitoAuthorizerDriver(setUserAttribute));

router.post('/slack/action-events', middleware.apiGatewayCognitoEventGenerator());
router.post('/slack/action-events', middleware.lambdaCognitoAuthorizerDriver(actionEvents));

export default router;
