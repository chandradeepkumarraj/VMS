import { useState, useEffect } from 'react';
import { Job, JobStatus } from '../types';
import { apiService } from '../services/apiService';

export const useJobs = (filter?: { clientId?: string; status?: JobStatus }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadJobs = async () => {
        setIsLoading(true);
        try {
            const data = await apiService.getJobs();
            // Apply filters client-side for now if backend doesn't support them yet
            let filtered = data;
            if (filter?.clientId) filtered = filtered.filter((j: any) => j.clientId === filter.clientId);
            if (filter?.status) filtered = filtered.filter((j: any) => j.status === filter.status);
            setJobs(filtered);
        } catch (err) {
            setError('Failed to load jobs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, [filter?.clientId, filter?.status]);

    return { jobs, isLoading, error, refetch: loadJobs };
};
