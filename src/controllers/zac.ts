// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import {
  registerWorks, getWorkCodeList, setWorkCodeList,
} from '@/src/handlers/zac';
import { middleware } from '@syuji6051/zac-job-library';

const router = express.Router();

router.post('/zac/works', middleware.apiGatewayV2EventGenerator());
router.post('/zac/works', middleware.lambdaEventV2AuthorizerDriver(registerWorks));

router.get('/zac/works/code-list', middleware.apiGatewayCognitoEventGenerator());
router.get('/zac/works/code-list', middleware.lambdaCognitoAuthorizerDriver(getWorkCodeList));

router.post('/zac/works/code-list', middleware.apiGatewayCognitoEventGenerator());
router.post('/zac/works/code-list', middleware.lambdaCognitoAuthorizerDriver(setWorkCodeList));

export default router;
