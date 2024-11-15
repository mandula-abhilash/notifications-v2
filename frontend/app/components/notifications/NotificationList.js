'use client';

import { useEffect, useState } from 'react';
import { getNotifications } from '@/app/lib/api/notifications';
import NotificationItem from './NotificationItem';
import { getSocket } from '@/app/lib/socket';

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const socket = getSocket();
    if (socket) {
      socket.on('newNotification', (notification) => {
        setNotifications(prev => [notification, ...prev]);
      });
    }

    return () => {
      if (socket) {
        socket.off('newNotification');
      }
    };
  }, []);

  if (loading) {
    return <div className="p-4">Loading notifications...</div>;
  }

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No notifications</div>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
            onUpdate={fetchNotifications}
          />
        ))
      )}
    </div>
  );
}