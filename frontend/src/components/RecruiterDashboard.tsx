
import React, { useState } from 'react';
import { Job, JobStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../hooks/useJobs';
import { Send, Clock, X, Globe, DollarSign } from 'lucide-react';
import { apiService } from '../services/apiService';
import { MessageCenter } from './MessageCenter';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export const RecruiterDashboard: React.FC = () => {
    const { user } = useAuth();
    const { jobs, isLoading: jobsLoading } = useJobs({ status: JobStatus.ACTIVE });
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [activeChat, setActiveChat] = useState<{ jobId: string, clientId: string, title: string } | null>(null);

    const [candidate, setCandidate] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        experience: 0,
        salaryExpectation: 0,
        resumeUrl: 'https://example.com/resume.pdf' // Placeholder
    });

    const handleSubmitCandidate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !selectedJob) return;

        try {
            await apiService.submitCandidate({
                jobId: selectedJob.id,
                candidate: {
                    ...candidate,
                    skills: candidate.skills.split(',').map(s => s.trim())
                },
                resumeUrl: candidate.resumeUrl
            });
            setSelectedJob(null);
            setCandidate({
                name: '',
                email: '',
                phone: '',
                skills: '',
                experience: 0,
                salaryExpectation: 0,
                resumeUrl: 'https://example.com/resume.pdf'
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (jobsLoading) return <div className="p-8 text-center text-slate-400 font-bold animate-pulse">Accessing Sourcing Terminal...</div>;

    return (
        <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Global Vendor Network
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">Sourcing Terminal</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-premium-shadow group hover:border-indigo-500 transition-all cursor-pointer">
                        <Globe className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 group-hover:rotate-12 transition-all" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <section className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map(job => (
                            <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all group relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">{job.title}</h3>
                                </div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{job.clientName}</p>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-8 leading-relaxed italic">"{job.description}"</p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Max Budget</span>
                                        <span className="text-lg font-black text-slate-900 flex items-center gap-1"><DollarSign className="w-4 h-4 text-emerald-500" /> {job.budget}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setActiveChat({ jobId: job.id, clientId: job.clientId, title: job.title })}
                                            className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all active:scale-95"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedJob(job)}
                                            className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center gap-2"
                                        >
                                            Submit talent <Send className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Clock className="w-5 h-5 text-indigo-600" /> Sourcing Velocity
                        </h2>
                        <div className="h-[150px] w-full mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[{ d: 'M', v: 2 }, { d: 'T', v: 5 }, { d: 'W', v: 3 }, { d: 'T', v: 8 }, { d: 'F', v: 12 }]}>
                                    <Area type="monotone" dataKey="v" stroke="#6366f1" fill="#f5f3ff" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Talent submission trend</p>
                    </div>
                </aside>
            </div>

            {selectedJob && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Submit Talent</h2>
                            <button onClick={() => setSelectedJob(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 transition-all"><X className="w-5 h-5 text-slate-900" /></button>
                        </div>
                        <form onSubmit={handleSubmitCandidate} className="p-10 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Candidate Name</label>
                                    <input required value={candidate.name} onChange={e => setCandidate({ ...candidate, name: e.target.value })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Candidate Email</label>
                                    <input required type="email" value={candidate.email} onChange={e => setCandidate({ ...candidate, email: e.target.value })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                                    <input required value={candidate.phone} onChange={e => setCandidate({ ...candidate, phone: e.target.value })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Years Experience</label>
                                        <input required type="number" value={candidate.experience} onChange={e => setCandidate({ ...candidate, experience: parseInt(e.target.value) })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Salary Expectation</label>
                                        <input required type="number" value={candidate.salaryExpectation} onChange={e => setCandidate({ ...candidate, salaryExpectation: parseInt(e.target.value) })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skills (comma separated)</label>
                                    <input value={candidate.skills} onChange={e => setCandidate({ ...candidate, skills: e.target.value })} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="React, Node.js, TS" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 mt-6">
                                Execute Submission
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {activeChat && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-[60] flex items-center justify-center p-6">
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Direct Client Terminal</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{activeChat.title}</p>
                            </div>
                            <button onClick={() => setActiveChat(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 transition-all"><X className="w-5 h-5 text-slate-900" /></button>
                        </div>
                        <div className="p-10">
                            <MessageCenter jobId={activeChat.jobId} recipientId={activeChat.clientId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
