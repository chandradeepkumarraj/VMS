import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import submissionRoutes from './routes/submissionRoutes';
import adminRoutes from './routes/adminRoutes';
import notificationRoutes from './routes/notificationRoutes';
import messageRoutes from './routes/messageRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Global Rate Limiter
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api/', limiter);

// Specific Rate Limiter for Auth
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // stricter for auth
    message: { error: 'Too many login attempts, please try again after 15 minutes' }
});
app.use('/api/auth/login', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global Error Handler
import { errorHandler } from './middleware/errorHandler';
app.use(errorHandler);

export default app;
