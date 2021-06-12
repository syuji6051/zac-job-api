// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import {
  workSync, workList, clockIn, clockOut, goReturn, goOut,
} from '@/src/handlers/works';
import { middleware } from '@syuji6051/zac-job-library';

const router = express.Router();

router.get('/works', middleware.apiGatewayCognitoEventGenerator());
router.get('/works', middleware.lambdaCognitoAuthorizerDriver(workList));

router.get('/works/sync', middleware.apiGatewayCognitoEventGenerator());
router.get('/works/sync', middleware.lambdaCognitoAuthorizerDriver(workSync));

router.post('/works/clock-in', middleware.apiGatewayCognitoEventGenerator());
router.post('/works/clock-in', middleware.lambdaCognitoAuthorizerDriver(clockIn));

router.post('/works/clock-out', middleware.apiGatewayCognitoEventGenerator());
router.post('/works/clock-out', middleware.lambdaCognitoAuthorizerDriver(clockOut));

router.post('/works/go-out', middleware.lambdaDriver(goOut));
router.post('/works/go-return', middleware.lambdaDriver(goReturn));

export default router;
