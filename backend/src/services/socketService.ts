
import { Server } from 'socket.io';

let io: Server;

export const initSocket = (socketIo: Server) => {
    io = socketIo;
};

export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

export const emitToUser = (userId: string, event: string, data: any) => {
    if (io) {
        io.to(userId).emit(event, data);
    }
};

export const broadcastEvent = (event: string, data: any) => {
    if (io) {
        io.emit(event, data);
    }
};
