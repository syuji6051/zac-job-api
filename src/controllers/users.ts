/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { middleware } from '@syuji6051/zac-job-library';
import {
  create, list, putZacInfo, putObcInfo, getUserInfo,
} from '@/src/handlers/users';

const router = express.Router();

router.post('/user', middleware.lambdaDriver(create));
router.get('/users', middleware.lambdaDriver(list));
router.get('/users/user-info', middleware.apiGatewayV2EventGenerator());
router.get('/users/user-info', middleware.lambdaDriver(getUserInfo));
router.put('/users/user-info/zac', middleware.apiGatewayV2EventGenerator());
router.put('/users/user-info/zac', middleware.lambdaDriver(putZacInfo));
router.put('/users/user-info/obc', middleware.apiGatewayV2EventGenerator());
router.put('/users/user-info/obc', middleware.lambdaDriver(putObcInfo));

export default router;
