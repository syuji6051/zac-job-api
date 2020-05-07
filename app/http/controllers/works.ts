import express from 'express';
import { workList } from '../handlers/works';
import lambdaDriver from '../middleware/lambda-driver';

const router = express.Router()

router.get('/works', lambdaDriver(workList));

export default router;
