import { Router } from 'express';
import { submitCandidate, getAgencySubmissions, getJobSubmissions, updateSubmissionStatus } from '../controllers/submissionController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.post('/', authenticateToken, authorizeRoles('RECRUITER'), submitCandidate);
router.get('/my-submissions', authenticateToken, authorizeRoles('RECRUITER'), getAgencySubmissions);
router.get('/job/:jobId', authenticateToken, authorizeRoles('CLIENT', 'ADMIN'), getJobSubmissions);
router.put('/:id/status', authenticateToken, authorizeRoles('CLIENT', 'ADMIN'), updateSubmissionStatus);

export default router;
