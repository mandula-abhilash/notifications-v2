'use client';

import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { markNotificationAsRead, deleteNotification } from '@/app/lib/api/notifications';

export default function NotificationItem({ notification, onUpdate }) {
  const handleMarkAsRead = async () => {
    try {
      await markNotificationAsRead(notification._id);
      onUpdate();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotification(notification._id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className={`p-4 mb-2 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'}`}>
      <div className="flex items-start gap-3">
        <Bell className="w-5 h-5 text-blue-500 mt-1" />
        <div className="flex-1">
          <p className="font-medium text-gray-900">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </span>
            {!notification.read && (
              <button
                onClick={handleMarkAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark as read
              </button>
            )}
            <button
              onClick={handleDelete}
              className="text-xs text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}