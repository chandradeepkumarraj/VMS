import { Router } from 'express';
import { createJob, getCompanyJobs, getAllJobs } from '../controllers/jobController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, authorizeRoles('CLIENT'), createJob);
router.get('/my-jobs', authenticateToken, authorizeRoles('CLIENT'), getCompanyJobs);
router.get('/open', authenticateToken, authorizeRoles('RECRUITER'), getAllJobs);

export default router;
