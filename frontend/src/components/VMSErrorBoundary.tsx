
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class VMSErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('VMS Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10 font-inter">
                    <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-200 text-center max-w-lg animate-in zoom-in-95">
                        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-100">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter mb-4">Workspace Interrupted</h2>
                        <p className="text-slate-500 text-sm leading-relaxed mb-10">We encountered an unexpected terminal interruption. Our automated diagnostics are running in the background.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                        >
                            Restart Session
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
