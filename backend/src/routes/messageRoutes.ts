import { Router } from 'express';
import { sendMessage, getJobMessages, getMyConversations } from '../controllers/messageController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.post('/', sendMessage);
router.get('/job/:jobId', getJobMessages);
router.get('/my-conversations', getMyConversations);

export default router;
