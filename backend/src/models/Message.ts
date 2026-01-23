import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    jobId: mongoose.Types.ObjectId;
    fromId: mongoose.Types.ObjectId;
    toId: mongoose.Types.ObjectId;
    content: string;
    read: boolean;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    fromId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
