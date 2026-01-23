import app from './app';
import connectDB from './config/db';
import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || '*',
        methods: ['GET', 'POST']
    }
});

import { initSocket } from './services/socketService';
import jwt from 'jsonwebtoken';

initSocket(io);

// Socket.io Authentication Middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error: Token missing'));
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, decoded: any) => {
        if (err) return next(new Error('Authentication error: Invalid token'));
        (socket as any).user = decoded;
        next();
    });
});

// Socket.io logic
io.on('connection', (socket) => {
    const user = (socket as any).user;
    console.log(`User connected: ${user.id} (${socket.id})`);

    // Join a personal room for notifications
    socket.on('join', (userId: string) => {
        // SECURITY: Only allow joining your OWN room
        if (userId !== user.id) {
            console.warn(`User ${user.id} attempted to join room for ${userId}`);
            return;
        }
        socket.join(userId);
        console.log(`User ${userId} joined their personal room`);
    });

    // Join a job-specific room for chat
    socket.on('join-job', (jobId: string) => {
        // TODO: In production, verify user is a participant of this job
        socket.join(`job-${jobId}`);
        console.log(`User ${user.id} joined job room: job-${jobId}`);
    });

    // Handle new message
    socket.on('send-message', (message: any) => {
        // SECURITY: Ensure senderId matches authenticated user
        if (message.senderId !== user.id) {
            console.warn(`User ${user.id} attempted to send message as ${message.senderId}`);
            return;
        }

        // Broadcast to the job room
        io.to(`job-${message.jobId}`).emit('new-message', message);

        // Also notify the recipient specifically if not in the room
        io.to(message.toId).emit('notification', {
            type: 'MESSAGE',
            title: 'New Message',
            message: `You have a new message for job ${message.jobId}`,
            jobId: message.jobId
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', user.id);
    });
});

// Connect to Database and start server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
});
