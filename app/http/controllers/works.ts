import express from 'express';
import { workSync } from '../handlers/works';
import lambdaDriver from '../middleware/lambda-driver';

const router = express.Router()

router.post('/works/sync', lambdaDriver(workSync));

export default router;
