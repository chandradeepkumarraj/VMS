import { Router } from 'express';
import { createPaymentIntent, getPaymentHistory } from '../controllers/paymentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.post('/create-intent', createPaymentIntent);
router.get('/history', getPaymentHistory);

export default router;
