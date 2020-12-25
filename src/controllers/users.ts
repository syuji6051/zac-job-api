import express from 'express';
import {
  create, list, postZacRegister, putZacLogin, putObcLogin,
} from '@/handlers/users';
import lambdaDriver from '@/middleware/lambda-driver';

const router = express.Router();

router.post('/user', lambdaDriver(create));
router.get('/users', lambdaDriver(list));
router.put('/user/attribute/zac', lambdaDriver(putZacLogin));
router.put('/user/attribute/obc', lambdaDriver(putObcLogin));
router.post('/user/zac/work', lambdaDriver(postZacRegister));

export default router;
