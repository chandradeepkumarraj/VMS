import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { Message } from '../types';
import { Send, MessageSquare } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface MessageCenterProps {
    jobId: string;
    recipientId: string;
}

export const MessageCenter: React.FC<MessageCenterProps> = ({ jobId, recipientId }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await apiService.getJobMessages(jobId);
                setMessages(data);
            } catch (err) {
                console.error('Failed to fetch messages');
            }
        };
        fetchMessages();

        const wsUrl = import.meta.env.VITE_API_URL;
        const newSocket = io(wsUrl);
        setSocket(newSocket);

        newSocket.emit('join-job', jobId);
        newSocket.on('new-message', (msg: Message) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [jobId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        try {
            const msg = await apiService.sendMessage(jobId, recipientId, newMessage);
            socket?.emit('send-message', msg);
            setNewMessage('');
        } catch (err) {
            console.error('Failed to send message');
        }
    };

    return (
        <div className="flex flex-col h-[500px] bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-slate-900">Communication Hub</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time collaboration</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
                        <p className="text-sm font-medium">No messages yet. Start the conversation!</p>
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.fromId === user?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${msg.fromId === user?.id
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                            }`}>
                            {msg.content}
                            <div className={`text-[10px] mt-1 font-bold ${msg.fromId === user?.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-3">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                />
                <button
                    type="submit"
                    className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};
