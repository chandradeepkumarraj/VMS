import { Response } from 'express';
import Message from '../models/Message';
import { AuthRequest } from '../middleware/auth';

export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const { jobId, toId, content } = req.body;
        const message = new Message({
            jobId,
            fromId: req.user?.id,
            toId,
            content,
            read: false
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getJobMessages = async (req: AuthRequest, res: Response) => {
    try {
        const { jobId } = req.params;
        const messages = await Message.find({
            jobId,
            $or: [
                { fromId: req.user?.id },
                { toId: req.user?.id }
            ]
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMyConversations = async (req: AuthRequest, res: Response) => {
    try {
        const messages = await Message.find({
            $or: [
                { fromId: req.user?.id },
                { toId: req.user?.id }
            ]
        }).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
