import express from 'express';
import { list } from '../handlers/works';
import lambdaDriver from '../middleware/lambda-driver';

const router = express.Router()

router.get('/works', lambdaDriver(list));

export default router;
