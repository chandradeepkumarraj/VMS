import { useState, useEffect } from 'react';


export const useSubmissions = (jobId?: string) => {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadSubmissions = async () => {
        setIsLoading(true);
        try {
            // apiService needs to be updated with getSubmissions
            // const data = await apiService.getSubmissions(jobId);
            setSubmissions([]);
        } catch (err) {
            setError('Failed to load submissions');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSubmissions();
    }, [jobId]);

    return { submissions, isLoading, error, refetch: loadSubmissions };
};
