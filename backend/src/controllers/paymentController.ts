import { Response } from 'express';
import Payment from '../models/Payment';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';

const calculateCommission = (annualSalary: number, urgency: string, agencyRating: number = 5): number => {
    let baseRate = 0.12; // 12%
    if (urgency === 'high') baseRate *= 1.02;
    if (urgency === 'critical') baseRate *= 1.03;
    const perfMultiplier = Math.max(0.9, Math.min(1.1, agencyRating / 5));
    let commission = annualSalary * baseRate * perfMultiplier;
    return Math.min(commission, annualSalary * 0.15); // 15% cap
};

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
    try {
        const { jobId, agencyId, annualSalary } = req.body;
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: 'Job not found' });

        const amount = calculateCommission(annualSalary, job.urgency);

        const payment = new Payment({
            jobId,
            agencyId,
            amount,
            status: 'pending'
        });
        await payment.save();

        // In a real app, integrate Stripe here:
        // const session = await stripe.checkout.sessions.create({...});

        res.status(201).json({
            payment,
            message: 'Payment intent created (Demo/Test Mode)'
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getPaymentHistory = async (req: AuthRequest, res: Response) => {
    try {
        const query = req.user?.role === 'ADMIN' ? {} : { agencyId: req.user?.id };
        const payments = await Payment.find(query).populate('jobId', 'title');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
