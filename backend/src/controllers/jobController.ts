import { Response } from 'express';
import Job from '../models/Job';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { broadcastEvent } from '../services/socketService';

const jobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    skills: z.array(z.string()),
    salaryRange: z.object({
        min: z.number(),
        max: z.number()
    }),
    location: z.string(),
    urgency: z.enum(['normal', 'high', 'critical']).optional(),
    anonymous: z.boolean().optional()
});

export const createJob = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = jobSchema.parse(req.body);
        const user = await User.findById(req.user?.id);
        const job = new Job({
            ...validatedData,
            companyId: req.user?.id,
            clientName: user?.profile.name || 'Enterprise Client',
            status: 'PENDING' // Admin must approve
        });
        await job.save();

        broadcastEvent('JOB_PUBLISHED', {
            id: job._id,
            title: job.title,
            clientName: job.clientName
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
};

export const getCompanyJobs = async (req: AuthRequest, res: Response) => {
    try {
        const jobs = await Job.find({ companyId: req.user?.id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getAllJobs = async (req: AuthRequest, res: Response) => {
    try {
        const jobs = await Job.find({ status: 'ACTIVE' });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
