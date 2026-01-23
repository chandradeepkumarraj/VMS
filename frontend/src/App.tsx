
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { ClientDashboard } from './components/ClientDashboard.tsx';
import { RecruiterDashboard } from './components/RecruiterDashboard.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { NotificationOutlet } from './components/NotificationOutlet';
import { VMSErrorBoundary } from './components/VMSErrorBoundary';
import {
    LogIn,
    UserPlus,
    LogOut,
    LayoutDashboard,
    Users,
    Briefcase,
    Network,
    ChevronDown,
    ChevronUp,
    FileText
} from 'lucide-react';

const Sidebar: React.FC<{ activeView: string, setActiveView: (v: any) => void }> = ({ activeView, setActiveView }) => {
    const { user, logout } = useAuth();
    const [dashboardOpen, setDashboardOpen] = useState(true);

    const isAdmin = user?.role === UserRole.ADMIN;

    return (
        <aside className="w-64 bg-[#1E1B4B] text-slate-400 h-screen sticky top-0 flex flex-col p-4 overflow-y-auto">
            {/* Branding Logo */}
            <div className="flex items-center gap-3 text-white mb-8 px-2 py-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black italic text-lg text-white">V</div>
                <span className="font-bold text-xl tracking-tight">VMS</span>
            </div>

            <nav className="flex-1 space-y-1">
                <div>
                    <button
                        onClick={() => setDashboardOpen(!dashboardOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeView === 'OVERVIEW' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white/10 hover:text-slate-200'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </div>
                        {dashboardOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                </div>

                {isAdmin ? (
                    <div className="space-y-1 pt-2">
                        <NavItem icon={<Users className="w-4 h-4" />} label="Clients" active={activeView === 'USERS'} onClick={() => setActiveView('USERS')} />
                        <NavItem icon={<Network className="w-4 h-4" />} label="Recruiters" active={activeView === 'VENDORS'} onClick={() => setActiveView('VENDORS')} />
                        <NavItem icon={<Briefcase className="w-4 h-4" />} label="Jobs" active={activeView === 'JOBS'} onClick={() => setActiveView('JOBS')} />
                        <NavItem icon={<FileText className="w-4 h-4" />} label="Submissions" active={activeView === 'LOGS'} onClick={() => setActiveView('LOGS')} />
                        <NavItem icon={<Users className="w-4 h-4" />} label="Candidates" active={activeView === 'CANDIDATES'} onClick={() => setActiveView('CANDIDATES')} />
                        <NavItem icon={<Briefcase className="w-4 h-4" />} label="Analytics" active={activeView === 'ANALYTICS'} onClick={() => setActiveView('ANALYTICS')} />
                        <NavItem icon={<FileText className="w-4 h-4" />} label="Settings" active={activeView === 'COMPLIANCE'} onClick={() => setActiveView('COMPLIANCE')} />
                    </div>
                ) : (
                    <div className="space-y-1 pt-2">
                        <NavItem icon={<Briefcase className="w-4 h-4" />} label="Requirements" active={activeView === 'REQS'} onClick={() => setActiveView('REQS')} />
                        <NavItem icon={<Users className="w-4 h-4" />} label="Candidates" active={activeView === 'TALENT'} onClick={() => setActiveView('TALENT')} />
                    </div>
                )}
            </nav>

            {/* User Info & Profile at Bottom */}
            <div className="mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold border-2 border-indigo-500 shadow-lg">
                        {user?.email[0].toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{user?.email.split('@')[0]}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="mt-4 flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/10 rounded-lg transition-all w-full text-left"
                >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
            </div>
        </aside>
    );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${active ? 'text-white' : 'hover:bg-white/5 hover:text-slate-200'
            }`}>
        <span className={active ? 'text-indigo-400' : ''}>{icon}</span>
        <span>{label}</span>
    </button>
);

const AuthPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState<UserRole>(UserRole.RECRUITER);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, role, company);
                setSuccess('Registration successful! Please sign in with your credentials.');
                setIsLogin(true); // Switch to login after success
                setPassword(''); // Clear password after register
            }
        } catch (err: any) {
            setError(typeof err === 'string' ? err : 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-inter">
            {/* Background decorative blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px] opacity-20" />

            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-200 relative z-10 overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="bg-slate-900 p-10 text-center relative group">
                    <button
                        onClick={onBack}
                        className="absolute top-6 left-6 text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all hover:-translate-x-1"
                    >
                        ← Back
                    </button>
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center font-black italic text-3xl text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">V</div>
                    <h1 className="text-white text-3xl font-black tracking-tighter">Welcome to VMS</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">Enterprise Recruitment Engine</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    {error && (
                        <div className="p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-2xl border border-rose-100 animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                            {success}
                        </div>
                    )}

                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button
                            type="button"
                            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-md transform scale-100' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-md transform scale-100' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Register
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-slate-300"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Password</label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-slate-300"
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLogin && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Entity Name</label>
                                    <input
                                        required
                                        value={company}
                                        onChange={e => setCompany(e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-slate-300"
                                        placeholder="Global Recruit Intl."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Platform Role</label>
                                    <div className="relative">
                                        <select
                                            value={role}
                                            onChange={e => setRole(e.target.value as UserRole)}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none appearance-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                                        >
                                            <option value={UserRole.RECRUITER}>Recruiter Network</option>
                                            <option value={UserRole.CLIENT}>Enterprise Client</option>
                                            <option value={UserRole.ADMIN}>Platform Admin</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                                {isLogin ? 'Access Portal' : 'Initialize Account'}
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const DashboardRouter: React.FC = () => {
    const { user } = useAuth();
    const [showAuth, setShowAuth] = useState(false);
    const [activeView, setActiveView] = useState('OVERVIEW');

    if (!user) {
        return showAuth ? (
            <AuthPage onBack={() => setShowAuth(false)} />
        ) : (
            <LandingPage onStart={() => setShowAuth(true)} />
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F0F2F5]">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1 p-8 max-w-[1400px] mx-auto w-full overflow-x-hidden">
                {user.role === UserRole.ADMIN && <AdminDashboard forcedTab={activeView as any} />}
                {user.role === UserRole.CLIENT && <ClientDashboard />}
                {user.role === UserRole.RECRUITER && <RecruiterDashboard />}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <VMSErrorBoundary>
                <NotificationOutlet />
                <DashboardRouter />
            </VMSErrorBoundary>
        </AuthProvider>
    );
};

export default App;
