
import React from 'react';
import { ShieldCheck, Users, ChevronRight, Twitter, Linkedin, Github, Layout, Target, Network } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="bg-white selection:bg-indigo-100 font-inter">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black italic text-xl text-white shadow-lg shadow-indigo-200">V</div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">VMS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Platform</a>
                        <a href="#solutions" className="hover:text-indigo-600 transition-colors">Solutions</a>
                        <a href="#impact" className="hover:text-indigo-600 transition-colors">Global Impact</a>
                    </div>
                    <button
                        onClick={onStart}
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                    >
                        Access Portal
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Realistic Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                        alt="Modern Enterprise Office"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Anonymous • Controlled • Bias-Free Hiring
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tighter uppercase">
                            Hire with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">THE CONTROL LAYER BETWEEN CLIENTS, RECRUITERS, AND HIRING</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
                            A modern Vendor Management System where clients post roles, recruiters submit talent, and hiring is governed by merit and speed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onStart}
                                className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:-translate-y-1"
                            >
                                Access Platform <ChevronRight className="w-5 h-5" />
                            </button>
                            <button className="bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold hover:bg-white transition-all shadow-sm">
                                Request Private Demo
                            </button>
                        </div>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500 font-medium italic">Trusted by leading recruitment teams and verified vendor partners.</p>
                        </div>
                    </div>

                    <div className="relative lg:block hidden animate-in fade-in zoom-in-95 duration-1000 delay-300">
                        <div className="relative z-10 bg-white/40 backdrop-blur-2xl p-4 rounded-[3rem] border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                                className="rounded-[2.5rem] w-full shadow-inner border border-slate-200"
                                alt="VMS Analytics Dashboard"
                            />
                            {/* Floating Dashboard Elements */}
                            <div className="absolute -top-10 -right-10 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 max-w-[200px] animate-bounce-slow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Approval</span>
                                </div>
                                <p className="text-sm font-bold text-slate-900">Candidate submission approved by VMS Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stakeholder Sections */}
            <section id="solutions" className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Circuitry" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">One VMS. Three Dedicated Workspaces. Total Hiring Control</h2>
                        <p className="text-slate-400 text-lg">Clients, recruiters, and admins each operate in a dedicated workspace — all connected through a single, unified source of truth.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <StakeholderCard
                            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                            icon={<ShieldCheck className="w-6 h-6" />}
                            title="VMS Admins"
                            subtitle="GOVERNANCE & CONTROL"
                            desc="Oversee your entire hiring ecosystem with centralized job approvals, vendor performance tracking, and duplicate requisition prevention."
                        />
                        <StakeholderCard
                            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                            icon={<Users className="w-6 h-6" />}
                            title="Clients & Hiring Teams"
                            subtitle="ROLE MANAGEMENT"
                            desc="Create job requirements, review shortlisted candidates, and make decisions — all while remaining anonymous for bias-free selection."
                        />
                        <StakeholderCard
                            image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
                            icon={<Network className="w-6 h-6" />}
                            title="Recruiter Partners"
                            subtitle="VENDOR OPERATIONS"
                            desc="Access approved job requirements, submit qualified candidates, track feedback instantly, and collaborate with hiring teams."
                        />
                    </div>
                </div>
            </section>

            {/* Feature Deep Dive */}
            <section id="features" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                            <img
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
                                className="rounded-[3rem] shadow-2xl relative z-10 border border-slate-100"
                                alt="Team Collaboration"
                            />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Redefining Vendor-Driven Hiring Through a Controlled VMS Workflow</h2>
                            <div className="space-y-8">
                                <FeatureItem
                                    icon={<Target className="w-6 h-6 text-indigo-600" />}
                                    title="Anonymous & Bias-Free Submissions"
                                    desc="Your VMS anonymizes recruiter and candidate details to ensure clients review talent purely based on skill."
                                />
                                <FeatureItem
                                    icon={<Layout className="w-6 h-6 text-indigo-600" />}
                                    title="Role-Based Dashboards for Every User"
                                    desc="Purpose-built dashboards for clients, recruiters, and admins enable seamless job intake, candidate submissions, and progress tracking."
                                />
                                <FeatureItem
                                    icon={<Network className="w-6 h-6 text-indigo-600" />}
                                    title="Centralized Control & Duplicate Prevention"
                                    desc="Admins maintain full oversight with job approvals, duplicate detection, timeline enforcement, and transparent vendor metrics."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Trust */}
            <section id="impact" className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-12">The VMS Impact</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
                        <StatBlock label="Placements Yearly" value="45k+" />
                        <StatBlock label="Time-to-Hire" value="-38%" />
                        <StatBlock label="Cost Savings" value="$2.4M" />
                        <StatBlock label="Global Partners" value="1.2k" />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover grayscale opacity-20"
                        alt="Skyscraper"
                    />
                </div>
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="bg-slate-900 rounded-[3rem] p-16 md:p-24 text-center shadow-[0_48px_80px_-16px_rgba(0,0,0,0.3)] border border-white/10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Take Control of Your Hiring Pipeline With a Unified VMS Platform</h2>
                        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">Join companies and recruiter partners who streamline job intake, candidate submissions, and approval workflows in one powerful system.</p>
                        <button
                            onClick={onStart}
                            className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-xl active:scale-95"
                        >
                            Launch Your Free VMS Pilot
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 pt-24 pb-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 text-white mb-8">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black italic text-xl text-white">V</div>
                                <span className="font-bold text-2xl tracking-tighter">VMS</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                                Pioneering the future of controlled hiring. A unified Vendor Management System built to streamline job intake, submissions, and selection.
                            </p>
                            <div className="flex gap-5">
                                <a href="#" className="text-slate-600 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-slate-600 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-slate-600 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">Workspaces</h4>
                            <ul className="space-y-4 text-slate-500 text-sm font-medium">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Client Workspace</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Recruiter Workspace</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Admin Control</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Submission Pipeline</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">Management</h4>
                            <ul className="space-y-4 text-slate-500 text-sm font-medium">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms & Privacy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">Impact</h4>
                            <ul className="space-y-4 text-slate-500 text-sm font-medium">
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Our Vision</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Global Network</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Case Studies</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Partners</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">© 2025 Technologies Global. ISO 27001 Certified.</p>
                        <div className="flex gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const StakeholderCard: React.FC<{ image: string, icon: React.ReactNode, title: string, subtitle: string, desc: string }> = ({ image, icon, title, subtitle, desc }) => (
    <div className="group relative rounded-[2rem] overflow-hidden bg-slate-800/50 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2">
        <div className="h-64 overflow-hidden relative">
            <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg shadow-lg">
                    {icon}
                </div>
                <div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-0.5">{subtitle}</div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
            </div>
        </div>
        <div className="p-8">
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            <button className="mt-6 text-indigo-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                Learn More <ChevronRight className="w-3 h-3" />
            </button>
        </div>
    </div>
);

const FeatureItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
    <div className="flex gap-5">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const StatBlock: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="text-center group">
        <div className="text-5xl font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors tracking-tighter">{value}</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{label}</div>
    </div>
);
