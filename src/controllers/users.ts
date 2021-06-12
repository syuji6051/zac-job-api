/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { middleware } from '@syuji6051/zac-job-library';
import {
  create, list, postZacRegister, putZacLogin, putObcLogin,
} from '@/src/handlers/users';

const router = express.Router();

router.post('/user', middleware.lambdaDriver(create));
router.get('/users', middleware.lambdaDriver(list));
router.put('/user/attribute/zac', middleware.lambdaDriver(putZacLogin));
router.put('/user/attribute/obc', middleware.lambdaDriver(putObcLogin));
router.post('/user/zac/work', middleware.lambdaDriver(postZacRegister));

export default router;
