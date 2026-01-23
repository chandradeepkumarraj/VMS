import { Router } from 'express';
import { getPendingKYCs, approveKYC, getPendingJobs, approveJob, getAllUsers } from '../controllers/adminController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateToken, authorizeRoles('ADMIN'));

router.get('/kyc/pending', getPendingKYCs);
router.post('/kyc/approve', approveKYC);
router.get('/users', getAllUsers);
router.get('/jobs/pending', getPendingJobs);
router.post('/jobs/approve', approveJob);

export default router;
