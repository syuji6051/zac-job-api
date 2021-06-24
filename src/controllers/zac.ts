// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import {
  registerWorks,
} from '@/src/handlers/zac';
import { middleware } from '@syuji6051/zac-job-library';

const router = express.Router();

router.post('/zac/works', middleware.apiGatewayV2EventGenerator());
router.post('/zac/works', middleware.lambdaEventV2AuthorizerDriver(registerWorks));

export default router;
