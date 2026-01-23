import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const apiService = {
    // Auth
    login: async (email: string, password?: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    register: async (userData: any) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Jobs
    getJobs: async () => {
        const response = await api.get('/jobs/open');
        return response.data;
    },
    getMyJobs: async () => {
        const response = await api.get('/jobs/my-jobs');
        return response.data;
    },
    createJob: async (jobData: any) => {
        const response = await api.post('/jobs', jobData);
        return response.data;
    },

    // Submissions
    submitCandidate: async (submissionData: any) => {
        const response = await api.post('/submissions', submissionData);
        return response.data;
    },
    getMySubmissions: async () => {
        const response = await api.get('/submissions/my-submissions');
        return response.data;
    },
    getJobSubmissions: async (jobId: string) => {
        const response = await api.get(`/submissions/job/${jobId}`);
        return response.data;
    },

    // Admin
    getUsers: async () => {
        const response = await api.get('/admin/users');
        return response.data;
    },
    getPendingKYCs: async () => {
        const response = await api.get('/admin/kyc/pending');
        return response.data;
    },
    approveKYC: async (userId: string, status: string) => {
        const response = await api.post('/admin/kyc/approve', { userId, status });
        return response.data;
    },
    getPendingJobs: async () => {
        const response = await api.get('/admin/jobs/pending');
        return response.data;
    },
    approveJob: async (jobId: string, status: string) => {
        const response = await api.post('/admin/jobs/approve', { jobId, status });
        return response.data;
    },

    // Candidates
    updateCandidateStatus: async (candidateId: string, status: string) => {
        const response = await api.put(`/submissions/${candidateId}/status`, { status });
        return response.data;
    },

    // Messaging
    sendMessage: async (jobId: string, toId: string, content: string) => {
        const response = await api.post('/messages', { jobId, toId, content });
        return response.data;
    },
    getJobMessages: async (jobId: string) => {
        const response = await api.get(`/messages/job/${jobId}`);
        return response.data;
    },
    getMyConversations: async () => {
        const response = await api.get('/messages/my-conversations');
        return response.data;
    },

    // Payments
    createPaymentIntent: async (jobId: string, agencyId: string, annualSalary: number) => {
        const response = await api.post('/payments/create-intent', { jobId, agencyId, annualSalary });
        return response.data;
    },
    getPaymentHistory: async () => {
        const response = await api.get('/payments/history');
        return response.data;
    },

    // Health
    checkHealth: async () => {
        const response = await api.get('/health');
        return response.data;
    }
};

