import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
    jobId: mongoose.Types.ObjectId;
    agencyId: mongoose.Types.ObjectId;
    candidate: {
        name: string;
        email: string;
        phone: string;
        skills: string[];
        experience: number;
        salaryExpectation: number;
    };
    resumeUrl: string;
    status: 'SUBMITTED' | 'SHORTLISTED' | 'INTERVIEW' | 'REJECTED' | 'HIRED';
    rating?: number;
    aiRanking?: number;
    agencyRemarks?: string;
    createdAt: Date;
}

const SubmissionSchema: Schema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    agencyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    candidate: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        skills: { type: [String], required: true },
        experience: { type: Number, required: true },
        salaryExpectation: { type: Number, required: true }
    },
    resumeUrl: { type: String, required: true },
    status: {
        type: String,
        enum: ['SUBMITTED', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'],
        default: 'SUBMITTED'
    },
    rating: { type: Number, min: 1, max: 5 },
    aiRanking: { type: Number, min: 0, max: 100, default: 0 },
    agencyRemarks: { type: String }
}, { timestamps: true });

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);
