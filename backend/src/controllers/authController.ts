import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['CLIENT', 'RECRUITER', 'ADMIN']),
    profile: z.object({
        name: z.string(),
        phone: z.string().optional(),
        location: z.string().optional()
    })
});

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role, company } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedPassword,
            role,
            profile: {
                name: company || email.split('@')[0],
            },
            kycStatus: role === 'ADMIN' ? 'APPROVED' : 'PENDING'
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully. Please login.' });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                profile: user.profile,
                kycStatus: user.kycStatus
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
