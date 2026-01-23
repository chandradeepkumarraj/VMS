import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
        console.error('CRITICAL: MONGODB_URI is not defined in the environment.');
        process.exit(1);
    }

    try {
        // Enforce strict query schemas to prevent NoSQL injection
        mongoose.set('strictQuery', true);

        const conn = await mongoose.connect(dbUri, {
            autoIndex: process.env.NODE_ENV !== 'production',
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error instanceof Error ? error.message : 'Unknown error during connection'}`);
        process.exit(1);
    }
};

export default connectDB;
