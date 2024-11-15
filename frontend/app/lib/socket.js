import { io } from 'socket.io-client';

let socket;

export const initializeSocket = (token) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: {
        token
      },
      withCredentials: true,
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      if (error.message === 'unauthorized') {
        window.location.href = '/login';
      }
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};