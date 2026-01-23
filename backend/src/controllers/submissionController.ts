import { Response } from 'express';
import Submission from '../models/Submission';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { emitToUser } from '../services/socketService';

const submissionSchema = z.object({
    jobId: z.string(),
    candidate: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        skills: z.array(z.string()),
        experience: z.number(),
        salaryExpectation: z.number()
    }),
    resumeUrl: z.string().url(),
    agencyRemarks: z.string().optional()
});

export const submitCandidate = async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = submissionSchema.parse(req.body);

        // Check if job exists and is published
        const job = await Job.findById(validatedData.jobId);
        if (!job || job.status !== 'ACTIVE') {
            return res.status(400).json({ error: 'Job not found or not open for submissions' });
        }

        // Simple AI Candidate Ranking Scaffold (Enhancement Loop 1)
        const calculateAIPositivityIndex = () => {
            const skillMatchCount = validatedData.candidate.skills.filter(s =>
                job.skills.map(js => js.toLowerCase()).includes(s.toLowerCase())
            ).length;
            const skillScore = job.skills.length > 0 ? (skillMatchCount / job.skills.length) * 60 : 30;
            const expWeight = Math.min(validatedData.candidate.experience / 5, 1) * 40; // Max score at 5 years
            return Math.min(Math.round(skillScore + expWeight), 100);
        };

        const submission = new Submission({
            ...validatedData,
            agencyId: req.user?.id,
            status: 'SUBMITTED',
            aiRanking: calculateAIPositivityIndex()
        });

        await submission.save();

        // Increment submission count on job
        job.submissionsCount += 1;
        await job.save();

        res.status(201).json({
            ...submission.toJSON(),
            aiInsights: `Candidate matches ${Math.round((calculateAIPositivityIndex() / 100) * 100)}% of the requirement profile.`
        });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
};

export const getAgencySubmissions = async (req: AuthRequest, res: Response) => {
    try {
        const submissions = await Submission.find({ agencyId: req.user?.id }).populate('jobId', 'title');
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getJobSubmissions = async (req: AuthRequest, res: Response) => {
    try {
        const { jobId } = req.params;
        const submissions = await Submission.find({ jobId }).populate('agencyId', 'profile.name');
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
export const updateSubmissionStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const submission = await Submission.findByIdAndUpdate(id, { status }, { new: true });

        if (submission) {
            emitToUser(submission.agencyId.toString(), 'SUBMISSION_STATUS_UPDATED', {
                submissionId: submission._id,
                status: submission.status,
                candidateName: submission.candidate.name
            });
        }

        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
