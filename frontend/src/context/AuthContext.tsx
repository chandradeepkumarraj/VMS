
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, UserRole } from '../types';
import { apiService } from '../services/apiService';
import { socketService } from '../services/socketService';

interface AuthContextType extends AuthState {
    login: (email: string, password?: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, role: UserRole, company: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
    });

    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('nexus_token');
            const savedUser = localStorage.getItem('nexus_user');

            if (savedToken && savedUser) {
                const user = JSON.parse(savedUser);
                setState({
                    user,
                    token: savedToken,
                    isLoading: false,
                });
                socketService.connect(savedToken);
            } else {
                setState(prev => ({ ...prev, isLoading: false }));
            }
        };
        initAuth();
    }, []);

    const login = async (email: string, password?: string) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            const data = await apiService.login(email, password);
            const { token, user } = data;
            localStorage.setItem('nexus_token', token);
            localStorage.setItem('nexus_user', JSON.stringify(user));
            setState({ user, token, isLoading: false });
            socketService.connect(token);
        } catch (err: any) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw err?.response?.data?.error || err?.message || 'Authentication failed';
        }
    };

    const register = async (email: string, password: string, role: UserRole, company: string) => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            await apiService.register({ email, password, role, company });
            setState(prev => ({ ...prev, isLoading: false }));
        } catch (err: any) {
            setState(prev => ({ ...prev, isLoading: false }));
            throw err?.response?.data?.error || err?.message || 'Registration failed';
        }
    };

    const logout = () => {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
        socketService.disconnect();
        setState({ user: null, token: null, isLoading: false });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
