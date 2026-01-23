import { Response } from 'express';
import User from '../models/User';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';
import { emitToUser } from '../services/socketService';

export const getPendingKYCs = async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.find({ kycStatus: 'PENDING' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const approveKYC = async (req: AuthRequest, res: Response) => {
    try {
        const { userId, status } = req.body; // status: approved | rejected
        const user = await User.findByIdAndUpdate(userId, { kycStatus: status }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getPendingJobs = async (req: AuthRequest, res: Response) => {
    try {
        const jobs = await Job.find({ status: 'PENDING' }).populate('companyId', 'profile.name');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

import { findMatchedAgencies } from '../services/matchingService';

export const approveJob = async (req: AuthRequest, res: Response) => {
    try {
        const { jobId, status } = req.body; // status: ACTIVE | CLOSED
        const job = await Job.findByIdAndUpdate(jobId, { status }, { new: true });

        if (job && status === 'ACTIVE') {
            const matches = await findMatchedAgencies(job);
            job.matchedAgencies = matches;
            await job.save();

            // Notify matched agencies (Self-Enhancement Loop 1)
            matches.forEach(agencyId => {
                emitToUser(agencyId.toString(), 'JOB_MATCHED', {
                    jobId: job._id,
                    title: job.title
                });
            });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
