import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { publishToQueue } from '../config/rabbitmq.js';

export const initializeSocketHandlers = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, config.jwtSecret);
      socket.userId = decoded.id;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId}`);

    // Join user's room
    socket.join(socket.userId);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
      socket.leave(socket.userId);
    });

    // Handle report generation request
    socket.on('generateReport', async (data) => {
      try {
        await publishToQueue('reports', {
          userId: socket.userId,
          ...data
        });
        
        socket.emit('reportQueued', {
          message: 'Report generation has been queued'
        });
      } catch (error) {
        socket.emit('error', {
          message: 'Failed to queue report generation'
        });
      }
    });
  });

  return io;
};