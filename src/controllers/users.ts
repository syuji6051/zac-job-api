import express from 'express';
import { create, list, putZacLogin } from '@/handlers/users';
import lambdaDriver from '@/middleware/lambda-driver';

const router = express.Router();

router.post('/user', lambdaDriver(create));
router.get('/users', lambdaDriver(list));
router.put('/user/attribute/zac', lambdaDriver(putZacLogin));

export default router;
