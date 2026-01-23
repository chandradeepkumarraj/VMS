import React, { useState } from 'react';
import { JobStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../hooks/useJobs';
import { Plus, Briefcase, Target, X } from 'lucide-react';
import { apiService } from '../services/apiService';
import { MessageCenter } from './MessageCenter';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ClientDashboard: React.FC = () => {
    const { user } = useAuth();
    const { jobs, isLoading: jobsLoading, refetch: refetchJobs } = useJobs({ clientId: user?.id });
    const [isPosting, setIsPosting] = useState(false);
    const [activeChat, setActiveChat] = useState<{ jobId: string, agencyId: string, title: string } | null>(null);

    const [newJob, setNewJob] = useState({
        title: '',
        description: '',
        budget: '',
        timeline: '',
        urgency: 'Medium' as 'Low' | 'Medium' | 'High',
        isAnonymous: false
    });

    const handleSubmitJob = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        try {
            await apiService.createJob({
                title: newJob.title,
                description: newJob.description,
                skills: [], // Defaults to empty, should add UI for this
                salaryRange: { min: 0, max: Number(newJob.budget) || 0 },
                location: 'Remote', // Default
                urgency: newJob.urgency.toLowerCase() as any
            });
            setIsPosting(false);
            setNewJob({
                title: '',
                description: '',
                budget: '',
                timeline: '',
                urgency: 'Medium',
                isAnonymous: false
            });
            refetchJobs();
        } catch (err) {
            console.error(err);
        }
    };

    if (jobsLoading) return <div className="p-8 text-center text-indigo-600 font-bold animate-pulse">Synchronizing Workspace...</div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <header className="flex justify-between items-end mb-12">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Private Client Portal
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter leading-tight">
                        {user?.companyName} <br />
                        <span className="text-slate-400 font-medium">Workspace Control</span>
                    </h1>
                </div>
                <button
                    onClick={() => setIsPosting(true)}
                    className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-bold flex items-center gap-3 transition-all shadow-2xl shadow-slate-200 active:scale-95"
                >
                    <Plus className="w-5 h-5" /> Create Requirement
                </button>
            </header>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Sourcing Velocity</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cumulative submissions per day</p>
                        </div>
                        <div className="text-indigo-600 font-bold text-xs bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">+24% ↑</div>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{ d: 'Mon', v: 4 }, { d: 'Tue', v: 7 }, { d: 'Wed', v: 5 }, { d: 'Thu', v: 12 }, { d: 'Fri', v: 15 }, { d: 'Sat', v: 14 }, { d: 'Sun', v: 18 }]}>
                                <defs>
                                    <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorV)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-[#1E1B4B] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20 group hover:-translate-y-1 transition-all duration-500">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                            <Target className="w-6 h-6 text-indigo-400" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-indigo-300">Active Sourcing</p>
                        <h2 className="text-5xl font-black mb-2 tracking-tighter">{jobs.length}</h2>
                        <p className="text-sm font-medium text-slate-400">Current Open Requirements</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-indigo-600" /> Requisitions
                    </h2>
                    <div className="space-y-6">
                        {jobs.length === 0 ? (
                            <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-bold">No active requisitions found.</div>
                        ) : (
                            jobs.map(job => (
                                <div key={job.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {job.id.toUpperCase()}</p>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${job.status === JobStatus.ACTIVE ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setActiveChat({ jobId: job.id, agencyId: 'BROADCAST', title: job.title })}
                                        className="mt-6 w-full py-4 px-6 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-3 border border-slate-200"
                                    >
                                        <Target className="w-4 h-4" /> Open Communication Stream
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>

            {isPosting && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">New Global Requirement</h2>
                            <button onClick={() => setIsPosting(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 transition-all"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmitJob} className="p-10 space-y-5 max-h-[70vh] overflow-y-auto">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Job Title / Seniority</label>
                                <input required value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="Senior Backend Engineer" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea required value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium min-h-[100px]" placeholder="Detailed job description..." />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Max Budget ($)</label>
                                    <input required type="number" value={newJob.budget} onChange={e => setNewJob({ ...newJob, budget: e.target.value })} className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Urgency</label>
                                    <select value={newJob.urgency} onChange={e => setNewJob({ ...newJob, urgency: e.target.value as any })} className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none appearance-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="Low">Low Priority</option>
                                        <option value="Medium">Medium Priority</option>
                                        <option value="High">High Priority</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">Broadcast Requirement</button>
                        </form>
                    </div>
                </div>
            )}
            {activeChat && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-[60] flex items-center justify-center p-6">
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Agency Network Stream</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{activeChat.title}</p>
                            </div>
                            <button onClick={() => setActiveChat(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 transition-all"><X className="w-5 h-5 text-slate-900" /></button>
                        </div>
                        <div className="p-10">
                            <MessageCenter jobId={activeChat.jobId} recipientId={activeChat.agencyId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
