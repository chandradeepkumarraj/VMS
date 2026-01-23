import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    companyId: mongoose.Types.ObjectId;
    clientName: string;
    title: string;
    description: string;
    skills: string[];
    salaryRange: { min: number; max: number };
    location: string;
    urgency: 'normal' | 'high' | 'critical';
    anonymous: boolean;
    status: 'PENDING' | 'ACTIVE' | 'CLOSED' | 'REJECTED' | 'DRAFT';
    submissionsCount: number;
    matchedAgencies: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const JobSchema: Schema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    clientName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: [String], required: true },
    salaryRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    location: { type: String, required: true },
    urgency: { type: String, enum: ['normal', 'high', 'critical'], default: 'normal' },
    anonymous: { type: Boolean, default: false },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'CLOSED', 'REJECTED', 'DRAFT'], default: 'PENDING', index: true },
    submissionsCount: { type: Number, default: 0 },
    matchedAgencies: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<IJob>('Job', JobSchema);
