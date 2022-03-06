// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import {
  linkAutoZacWorks, getWorkCodeList, setWorkCodeList,
} from '@/src/handlers/zac';
import { middleware } from '@syuji6051/zac-job-library';

const router = express.Router();

router.post('/zac/works/auto-link', middleware.apiGatewayV2EventGenerator());
router.post('/zac/works/auto-link', middleware.lambdaEventV2AuthorizerDriver(linkAutoZacWorks));

router.get('/zac/works/code-list', middleware.apiGatewayCognitoEventGenerator());
router.get('/zac/works/code-list', middleware.lambdaCognitoAuthorizerDriver(getWorkCodeList));

router.post('/zac/works/code-list', middleware.apiGatewayCognitoEventGenerator());
router.post('/zac/works/code-list', middleware.lambdaCognitoAuthorizerDriver(setWorkCodeList));

export default router;
