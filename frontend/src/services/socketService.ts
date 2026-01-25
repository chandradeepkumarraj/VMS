import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;

if (!SOCKET_URL) {
    console.warn('VITE_API_URL is not defined. Socket connection might fail.');
}

class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(SOCKET_URL, {
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 5
        });

        this.socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        this.socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
        });
    }

    connect(token: string) {
        // Update auth token and connect
        this.socket.auth = { token };
        if (this.socket.disconnected) {
            this.socket.connect();
        }
    }

    disconnect() {
        this.socket.disconnect();
    }

    on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    off(event: string, callback: (data: any) => void) {
        this.socket.off(event, callback);
    }

    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }
}

export const socketService = new SocketService();
