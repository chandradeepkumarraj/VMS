import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
    jobId: mongoose.Types.ObjectId;
    agencyId: mongoose.Types.ObjectId;
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    stripeId?: string;
    createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    agencyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    stripeId: { type: String }
}, { timestamps: true });

export default mongoose.model<IPayment>('Payment', PaymentSchema);
