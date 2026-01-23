
import React, { useState, useEffect } from 'react';
import { User, Job, UserStatus, JobStatus, UserRole, SystemLog } from '../types';
import { apiService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
    Users,
    Briefcase,
    CheckCircle,
    XCircle,
    Activity,
    List,
    Search,
    Filter,
    ChevronRight,
    UserCheck,
    Bell,
    MessageSquare,
    Settings,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

type AdminTab = 'OVERVIEW' | 'USERS' | 'JOBS' | 'LOGS' | 'VENDORS' | 'COMPLIANCE' | 'CANDIDATES' | 'ANALYTICS';

interface AdminDashboardProps {
    forcedTab?: AdminTab;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ forcedTab }) => {
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState<AdminTab>('OVERVIEW');
    const [users, setUsers] = useState<User[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [logs, setLogs] = useState<SystemLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Sync with sidebar navigation
    useEffect(() => {
        if (forcedTab) setActiveTab(forcedTab);
    }, [forcedTab]);

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 15000);
        return () => clearInterval(interval);
    }, []);

    const loadData = async () => {
        try {
            const [u, j] = await Promise.all([
                apiService.getUsers(),
                apiService.getJobs()
            ]);
            setUsers(u);
            setJobs(j);
            setLogs([]);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    };

    const handleUserStatus = async () => {
        if (!currentUser) return;
        await loadData();
    };

    const handleJobStatus = async () => {
        if (!currentUser) return;
        await loadData();
    };

    if (isLoading) return <div className="flex items-center justify-center h-full text-indigo-600 font-bold animate-pulse">Loading Administrative Suite...</div>;

    const renderContent = () => {
        switch (activeTab) {
            case 'OVERVIEW': return <OverviewTab users={users} jobs={jobs} setActiveTab={setActiveTab} />;
            case 'USERS': return <UsersManagement users={users.filter(u => u.role === UserRole.CLIENT)} onUpdate={handleUserStatus} title="Client Directory" />;
            case 'VENDORS': return <UsersManagement users={users.filter(u => u.role === UserRole.RECRUITER)} onUpdate={handleUserStatus} title="Recruiter Directory" />;
            case 'JOBS': return <JobsManagement jobs={jobs} onUpdate={handleJobStatus} />;
            case 'LOGS': return <ActivityStream logs={logs} />;
            case 'CANDIDATES': return <div className="bg-white p-20 text-center rounded-3xl border border-slate-200">Candidates Database View - Coming Soon</div>;
            case 'ANALYTICS': return <AnalyticsHub users={users} />;
            case 'COMPLIANCE': return <ComplianceCenter />;
            default: return <OverviewTab users={users} jobs={jobs} setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-8">
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        className="w-full bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
                        placeholder="Search system records..."
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-50 animate-pulse"></span>
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all"><MessageSquare className="w-5 h-5" /></button>
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all"><Settings className="w-5 h-5" /></button>
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 p-[2px]">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                                className="w-full h-full rounded-full object-cover border border-white"
                                alt="Sarah Johnson"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

const OverviewTab: React.FC<{ users: User[], jobs: Job[], setActiveTab: (t: AdminTab) => void }> = ({ users, jobs, setActiveTab }) => {
    const clientsCount = users.filter(u => u.role === UserRole.CLIENT).length || 0;
    const recruitersCount = users.filter(u => u.role === UserRole.RECRUITER).length || 0;
    const activeJobsCount = jobs.filter(j => j.status === JobStatus.ACTIVE).length || 0;
    const pendingJobsCount = jobs.filter(j => j.status === JobStatus.PENDING).length || 0;

    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Control Center</h2>
                    <p className="text-slate-500 font-medium">Enterprise recruitment infrastructure oversight.</p>
                </div>
                <div className="hidden sm:block text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">System Live</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <OverviewStatCard icon={<Briefcase className="w-5 h-5 text-indigo-600" />} iconBg="bg-indigo-50" label="Total Clients" value={clientsCount} trend="+8.2%" trendUp={true} />
                <OverviewStatCard icon={<Users className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" label="Total Recruiters" value={recruitersCount} trend="+5.7%" trendUp={true} />
                <OverviewStatCard icon={<Activity className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" label="Active Jobs" value={activeJobsCount} trend="-1.9%" trendUp={false} />
                <OverviewStatCard icon={<UserCheck className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" label="Total Candidates" value={289} trend="+6.4%" trendUp={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Pending Actions</h3>
                        <div className="space-y-4">
                            <PendingActionItem
                                icon={<Briefcase className="w-5 h-5 text-indigo-600" />}
                                label="Pending Job Approvals"
                                count={`${pendingJobsCount} Pending`}
                                onReview={() => setActiveTab('JOBS')}
                            />
                            <PendingActionItem
                                icon={<Users className="w-5 h-5 text-purple-600" />}
                                label="Pending Candidate Submissions"
                                count="0 Pending"
                                onReview={() => setActiveTab('CANDIDATES')}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[#1E1B4B] rounded-3xl p-8 text-white shadow-xl shadow-indigo-900/20">
                        <h3 className="font-bold flex items-center gap-3 mb-8">
                            <Activity className="w-5 h-5 text-indigo-400" /> System Health
                        </h3>
                        <div className="space-y-6">
                            <HealthItem label="Core Engine" status="ONLINE" active={true} />
                            <HealthItem label="API Layer" status="ACTIVE" active={true} />
                            <HealthItem label="Cloud Sync" status="OPERATIONAL" active={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OverviewStatCard: React.FC<{ icon: React.ReactNode, iconBg: string, label: string, value: number, trend: string, trendUp: boolean }> = ({ icon, iconBg, label, value, trend, trendUp }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 ${iconBg} rounded-xl`}>{icon}</div>
            <span className="text-sm font-semibold text-slate-500">{label}</span>
        </div>
        <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900 tracking-tight">{value}</span>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {trend}
            </div>
        </div>
    </div>
);

const PendingActionItem: React.FC<{ icon: React.ReactNode, label: string, count: string, onReview: () => void, flagged?: boolean }> = ({ icon, label, count, onReview, flagged }) => (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
        <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${flagged ? 'bg-rose-50' : 'bg-white shadow-sm'}`}>{icon}</div>
            <div>
                <p className="text-sm font-bold text-slate-900">{label}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-600">{count}</span>
            <button onClick={onReview} className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${flagged ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}>Review</button>
            <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
    </div>
);

const HealthItem: React.FC<{ label: string, status: string, active: boolean }> = ({ label, status, active }) => (
    <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-indigo-400">{status}</span>
            <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`} />
        </div>
    </div>
);

const UsersManagement: React.FC<{ users: User[], onUpdate: (id: string, s: UserStatus) => void, title: string }> = ({ users, onUpdate, title }) => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">{title}</h3>
            <div className="flex gap-2">
                <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600"><Filter className="w-4 h-4" /></button>
                <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600"><List className="w-4 h-4" /></button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="px-6 py-4">Entity</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Control</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{u.companyName}</div>
                                <div className="text-xs text-slate-500">{u.email}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.status === UserStatus.APPROVED ? 'bg-emerald-50 text-emerald-600' :
                                    u.status === UserStatus.PENDING ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                    }`}>{u.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                {u.status === UserStatus.PENDING && (
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => onUpdate(u.id, UserStatus.APPROVED)} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all"><CheckCircle className="w-4 h-4" /></button>
                                        <button onClick={() => onUpdate(u.id, UserStatus.REJECTED)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all"><XCircle className="w-4 h-4" /></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const JobsManagement: React.FC<{ jobs: Job[], onUpdate: (id: string, s: JobStatus) => void }> = ({ jobs, onUpdate }) => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Platform Job Control</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="px-6 py-4">Requisition</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {jobs.map(j => (
                        <tr key={j.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">{j.title}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase">{j.clientName}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${j.status === JobStatus.ACTIVE ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'
                                    }`}>{j.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                {j.status === JobStatus.PENDING && (
                                    <button onClick={() => onUpdate(j.id, JobStatus.ACTIVE)} className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase hover:bg-indigo-700 transition-all">Approve</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ActivityStream: React.FC<{ logs: SystemLog[] }> = ({ logs }) => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
        <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">System Activity Stream</h3>
        </div>
        <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
            {logs.map(log => (
                <div key={log.id} className="flex gap-4">
                    <div className={`w-1 h-8 rounded-full flex-shrink-0 ${log.type === 'CRITICAL' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                    <div>
                        <p className="text-sm font-bold text-slate-900">{log.action}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{log.user}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
const AnalyticsHub: React.FC<{ users: User[] }> = ({ users }) => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-8">Platform Growth</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{ n: 'W1', u: 5, j: 10 }, { n: 'W2', u: 12, j: 25 }, { n: 'W3', u: 18, j: 45 }, { n: 'W4', u: 30, j: 80 }]}>
                            <XAxis dataKey="n" />
                            <Tooltip />
                            <Area type="monotone" dataKey="u" stroke="#6366f1" fill="#f5f3ff" />
                            <Area type="monotone" dataKey="j" stroke="#10b981" fill="#ecfdf5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-8">Role Distribution</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Clients', value: users.filter(u => u.role === UserRole.CLIENT).length },
                            { name: 'Recruiters', value: users.filter(u => u.role === UserRole.RECRUITER).length }
                        ]}>
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
);

const ComplianceCenter: React.FC = () => (
    <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-500">
        <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">System Compliance & Security</h3>
            <p className="text-slate-500 text-sm">Review platform-wide security protocols and audit trails.</p>
        </div>
        <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-slate-900">RBAC Enforcement</h4>
                    <p className="text-xs text-slate-500 font-medium">Global Role Based Access Control is active.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Hardened</div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-slate-900">Data Encryption</h4>
                    <p className="text-xs text-slate-500 font-medium">AES-256 encryption at rest and TLS 1.3 in transit.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Verified</div>
            </div>
        </div>
    </div>
);
