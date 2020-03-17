import express from 'express';
import { create, list } from '../handlers/users';
import lambdaDriver from '../middleware/lambda-driver';

const router = express.Router()

router.post('/user', lambdaDriver(create));
router.get('/users', lambdaDriver(list));

export default router;
