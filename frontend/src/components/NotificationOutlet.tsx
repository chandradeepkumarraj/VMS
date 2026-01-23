
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { socketService } from '../services/socketService';

export const NotificationOutlet: React.FC = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        // Listen for global platform events
        const handleNewJob = (data: any) => {
            toast.success(`New Requirement: ${data.title}`, {
                icon: '🚀',
                duration: 5000,
                style: {
                    background: '#1e1b4b',
                    color: '#fff',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '12px'
                }
            });
        };

        const handleSubmissionUpdate = (data: any) => {
            toast(`Candidate ${data.status}: ${data.candidateName}`, {
                icon: '📋',
                duration: 4000,
                style: {
                    background: '#6366f1',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px'
                }
            });
        };

        socketService.on('JOB_PUBLISHED', handleNewJob);
        socketService.on('SUBMISSION_STATUS_UPDATED', handleSubmissionUpdate);

        return () => {
            socketService.off('JOB_PUBLISHED', handleNewJob);
            socketService.off('SUBMISSION_STATUS_UPDATED', handleSubmissionUpdate);
        };
    }, [user]);

    return (
        <Toaster
            position="top-right"
            toastOptions={{
                className: 'premium-toast',
                duration: 3000,
            }}
        />
    );
};
