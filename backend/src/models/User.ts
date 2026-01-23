import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'CLIENT' | 'RECRUITER' | 'ADMIN';
    kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
    profile: {
        name: string;
        phone?: string;
        location?: string;
        specialization?: string[];
        companySize?: string;
    };
    performanceMetrics: {
        successRate: number;
        avgTimeToFill: number; // in days
        sourcingAccuracy: number; // percentage of approved vs rejected candidates
    };
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['CLIENT', 'RECRUITER', 'ADMIN'], required: true },
    kycStatus: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    profile: {
        name: { type: String, required: true },
        phone: { type: String },
        location: { type: String },
        specialization: { type: [String] },
        companySize: { type: String }
    },
    performanceMetrics: {
        successRate: { type: Number, default: 0 },
        avgTimeToFill: { type: Number, default: 0 },
        sourcingAccuracy: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
