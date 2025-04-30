"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification, NotificationType, TransactionNotification, WatchlistNotification, AccountNotification, SystemNotification } from '@/types/notifications';
import { useWebSocket } from './WebSocketContext';
import { TransactionDetail } from '@/types/network';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: <T extends Notification>(notification: Omit<T, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { wsService } = useWebSocket();

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (!wsService) return;

    const handleTransaction = (data: TransactionDetail) => {
      const solChange = data.sol_bal_change[0];
      if (solChange) {
        const notification: Omit<TransactionNotification, 'id' | 'timestamp' | 'read'> = {
          type: 'transaction',
          title: 'New Transaction',
          message: `Transaction ${data.tx_hash.slice(0, 8)}...${data.tx_hash.slice(-8)} processed`,
          data: {
            txHash: data.tx_hash,
            amount: parseFloat(solChange.change_amount),
            from: solChange.address,
            to: data.signer[0],
          }
        };
        addNotification<TransactionNotification>(notification);
      }
    };

    const socket = wsService['socket'];
    if (socket) {
      socket.on('transaction', handleTransaction);
    }

    return () => {
      if (socket) {
        socket.off('transaction', handleTransaction);
      }
    };
  }, [wsService]);

  const addNotification = useCallback(<T extends Notification>(notification: Omit<T, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: T = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false
    } as T;
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        removeNotification,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 