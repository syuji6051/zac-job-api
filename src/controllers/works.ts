import express from 'express';
import {
  workSync, clockIn, clockOut, goReturn, goOut,
} from '@/handlers/works';
import lambdaDriver from '@/middleware/lambda-driver';

const router = express.Router();

router.post('/works/sync', lambdaDriver(workSync));
router.post('/works/clock-in', lambdaDriver(clockIn));
router.post('/works/clock-out', lambdaDriver(clockOut));
router.post('/works/go-out', lambdaDriver(goOut));
router.post('/works/go-return', lambdaDriver(goReturn));

export default router;
