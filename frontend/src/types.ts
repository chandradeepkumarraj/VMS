
export enum UserRole {
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
    RECRUITER = 'RECRUITER'
}

export enum UserStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    DEACTIVATED = 'DEACTIVATED'
}

export enum JobStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
    REJECTED = 'REJECTED'
}

export enum CandidateStatus {
    SUBMITTED = 'SUBMITTED',
    L1 = 'L1',
    SHORTLISTED = 'SHORTLISTED',
    SELECTED = 'SELECTED',
    REJECTED = 'REJECTED'
}

export interface User {
    id: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    companyName: string;
}

export interface Job {
    id: string;
    title: string;
    description: string;
    budget: string;
    timeline: string;
    urgency: 'Low' | 'Medium' | 'High';
    clientId: string;
    clientName: string;
    status: JobStatus;
    isAnonymous: boolean;
    createdAt: string;
}

export interface Candidate {
    id: string;
    name: string;
    email: string;
    resumeUrl: string;
    jobId: string;
    jobTitle: string;
    recruiterId: string;
    recruiterName: string;
    status: CandidateStatus;
    submittedAt: string;
}

export interface SystemLog {
    id: string;
    action: string;
    user: string;
    timestamp: string;
    type: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface Message {
    id: string;
    jobId: string;
    fromId: string;
    toId: string;
    content: string;
    read: boolean;
    createdAt: string;
}

export interface Payment {
    id: string;
    jobId: string;
    agencyId: string;
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}
