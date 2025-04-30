import React from 'react';
import { Notification } from '@/types/notifications';
import { useNotifications } from '@/contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead, removeNotification } = useNotifications();

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNotification(notification.id);
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'transaction':
        return '💰';
      case 'watchlist':
        return '👀';
      case 'account':
        return '👤';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  return (
    <div
      className={`p-4 border-b border-slate-700 hover:bg-slate-700 cursor-pointer transition-colors ${
        !notification.read ? 'bg-slate-800' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">{getNotificationIcon()}</span>
          <div>
            <h3 className="font-medium text-white">{notification.title}</h3>
            <p className="text-sm text-gray-400">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-300"
        >
          ×
        </button>
      </div>
    </div>
  );
}; 