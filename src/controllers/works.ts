// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import {
  workSync, workList, clockIn, clockOut, goReturn, goOut,
} from '@/src/handlers/works';
import { middleware } from '@syuji6051/zac-job-library';

const router = express.Router();

router.get('/works', middleware.apiGatewayV2EventGenerator());
router.get('/works', middleware.lambdaEventV2AuthorizerDriver(workList));

router.get('/works/sync', middleware.apiGatewayV2EventGenerator());
router.get('/works/sync', middleware.lambdaEventV2AuthorizerDriver(workSync));

router.post('/works/clock-in', middleware.apiGatewayV2EventGenerator());
router.post('/works/clock-in', middleware.lambdaEventV2AuthorizerDriver(clockIn));

router.post('/works/clock-out', middleware.apiGatewayV2EventGenerator());
router.post('/works/clock-out', middleware.lambdaEventV2AuthorizerDriver(clockOut));

router.post('/works/go-out', middleware.apiGatewayV2EventGenerator());
router.post('/works/clock-out', middleware.lambdaEventV2AuthorizerDriver(goOut));

router.post('/works/go-out', middleware.apiGatewayV2EventGenerator());
router.post('/works/go-return', middleware.lambdaEventV2AuthorizerDriver(goReturn));

export default router;
