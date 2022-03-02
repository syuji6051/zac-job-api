// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import {
  workSync, workList, punchWork,
} from '@/src/handlers/works';
import { middleware } from '@syuji6051/zac-job-library';

const router = express.Router();

router.get('/works', middleware.apiGatewayV2EventGenerator());
router.get('/works', middleware.lambdaEventV2AuthorizerDriver(workList));

router.get('/works/sync', middleware.apiGatewayV2EventGenerator());
router.get('/works/sync', middleware.lambdaEventV2AuthorizerDriver(workSync));

router.post('/works/punch', middleware.apiGatewayV2EventGenerator());
router.post('/works/punch', middleware.lambdaEventV2AuthorizerDriver(punchWork));

export default router;
