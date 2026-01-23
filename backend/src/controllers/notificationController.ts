import { Response } from 'express';
import Notification from '../models/Notification';
import { AuthRequest } from '../middleware/auth';

export const getNotifications = async (req: AuthRequest, res: Response) => {
    try {
        const notifications = await Notification.find({ userId: req.user?.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
    try {
        const { notificationId } = req.params;
        await Notification.findOneAndUpdate(
            { _id: notificationId, userId: req.user?.id },
            { read: true }
        );
        res.json({ message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
