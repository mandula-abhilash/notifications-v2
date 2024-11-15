import { consumeQueue } from '../config/rabbitmq.js';
import { io } from '../socket/socketHandlers.js';

const processNotification = async (data) => {
  try {
    if (data.type === 'new_notification') {
      // Emit to specific user's room
      io.to(data.notification.userId.toString()).emit('newNotification', data.notification);
    }
  } catch (error) {
    console.error('Error processing notification:', error);
  }
};

export const startNotificationWorker = async () => {
  try {
    await consumeQueue('notifications', processNotification);
    console.log('Notification worker started');
  } catch (error) {
    console.error('Error starting notification worker:', error);
    throw error;
  }
};