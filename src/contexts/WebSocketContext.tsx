"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import WebSocketService from '@/services/websocket';
import { useAuth } from './AuthContext';

interface WebSocketContextType {
  wsService: WebSocketService;
  isConnected: boolean;
  lastUpdate: Date | null;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const wsService = WebSocketService.getInstance();

  useEffect(() => {
    if (token) {
      wsService.setToken(token);
    }
  }, [token]);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      setLastUpdate(new Date());
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleUpdate = () => {
      setLastUpdate(new Date());
    };

    // Add event listeners
    const socket = wsService['socket'];
    if (socket) {
      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      socket.on('large-transactions', handleUpdate);
    }

    return () => {
      if (socket) {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
        socket.off('large-transactions', handleUpdate);
      }
    };
  }, [wsService]);

  return (
    <WebSocketContext.Provider value={{ wsService, isConnected, lastUpdate }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}; 