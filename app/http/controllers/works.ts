import express from 'express';
import { workSync, clockIn } from '../handlers/works';
import lambdaDriver from '../middleware/lambda-driver';

const router = express.Router()

router.post('/works/sync', lambdaDriver(workSync));
router.post('/works/clock', lambdaDriver(clockIn));

export default router;
