import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';
import { WatchlistItem } from '@/types/network';
import { useEffect } from 'react';

interface TransactionDetails {
  tx_hash: string;
  fee: number;
  signer: string;
  slot: number;
  status: string;
  block_time: number;
  time: string;
  program_ids: string[];
  parsed_instructions: any[];
  compute_units_consumed: number;
  priority_fee: number;
  recent_block_hash: string;
  log_messages: string[];
  account_keys: any[];
  sol_bal_change: any[];
  token_bal_change: any[];
  tokens_involved: string[];
  type: string;
  is_large: boolean;
  timestamp: string;
}

interface AccountChanges {
  hasChanges: boolean;
  balanceChanges: Array<{
    oldBalance: number;
    newBalance: number;
  }>;
  newTransactions: any[];
  portfolioChanges: Array<{
    oldPortfolio: any;
    newPortfolio: any;
  }>;
  tokenAccountChanges: Array<{
    oldTokenAccounts: any;
    newTokenAccounts: any;
  }>;
  stakeAccountChanges: Array<{
    oldStakeAccounts: any;
    newStakeAccounts: any;
  }>;
  newTransfers: any[];
  newDefiActivities: any[];
}

interface WebSocketEventHandlers {
  onLargeTransactions?: (data: TransactionDetails[]) => void;
  onWatchlistActivity?: (data: any) => void;
  onAccountUpdate?: (data: { changes: AccountChanges, data: any }) => void;
  onLargeTransaction?: (data: any) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
}

class WebSocketService {
  private static instance: WebSocketService;
  private socket: Socket | null = null;
  private watchlistSocket: Socket | null = null;
  private accountSocket: Socket | null = null;
  private token: string | null = null;
  private eventHandlers: WebSocketEventHandlers = {};

  private constructor() {
    this.initializeSockets();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public setEventHandlers(handlers: WebSocketEventHandlers) {
    this.eventHandlers = { ...this.eventHandlers, ...handlers };
  }

  private initializeSockets() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    
    // Main socket for general updates
    this.socket = io(`${baseUrl}/transactions`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Watchlist socket for watchlist-specific updates
    this.watchlistSocket = io(`${baseUrl}/watchlist-activity`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Account monitoring socket
    this.accountSocket = io(`${baseUrl}/whale-monitor/account`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (this.socket) {
      this.socket.on('connect', () => {
        console.log('Connected to transactions channel');
        this.eventHandlers.onConnect?.();
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from transactions channel');
        this.eventHandlers.onDisconnect?.();
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
        this.eventHandlers.onError?.(error);
      });

      this.socket.on('large-transactions', (data: TransactionDetails[]) => {
        this.eventHandlers.onLargeTransactions?.(data);
      });
    }

    if (this.watchlistSocket) {
      this.watchlistSocket.on('connect', () => {
        console.log('Connected to watchlist activity channel');
        this.eventHandlers.onConnect?.();
      });

      this.watchlistSocket.on('disconnect', () => {
        console.log('Disconnected from watchlist activity channel');
        this.eventHandlers.onDisconnect?.();
      });

      this.watchlistSocket.on('error', (error) => {
        console.error('Watchlist socket error:', error);
        this.eventHandlers.onError?.(error);
      });

      this.watchlistSocket.on('new_activity', (data: any) => {
        this.eventHandlers.onWatchlistActivity?.(data);
      });
    }

    if (this.accountSocket) {
      this.accountSocket.on('connect', () => {
        console.log('Connected to account monitoring channel');
        this.eventHandlers.onConnect?.();
      });

      this.accountSocket.on('disconnect', () => {
        console.log('Disconnected from account monitoring channel');
        this.eventHandlers.onDisconnect?.();
      });

      this.accountSocket.on('error', (error) => {
        console.error('Account socket error:', error);
        this.eventHandlers.onError?.(error);
      });

      this.accountSocket.on('account-update', (data: { changes: AccountChanges, data: any }) => {
        this.eventHandlers.onAccountUpdate?.(data);
      });

      this.accountSocket.on('large-transaction', (data: any) => {
        this.eventHandlers.onLargeTransaction?.(data);
      });
    }
  }

  public setToken(token: string) {
    this.token = token;
    if (this.watchlistSocket) {
      this.watchlistSocket.auth = { token };
    }
  }

  public subscribeToAccount(address: string) {
    if (this.accountSocket) {
      this.accountSocket.emit('subscribe', address);
    }
  }

  public unsubscribeFromAccount(address: string) {
    if (this.accountSocket) {
      this.accountSocket.emit('unsubscribe', address);
    }
  }

  public getTransactionDetails(txHash: string): Promise<TransactionDetails> {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        this.socket.emit('get-transaction', txHash);
        this.socket.once('transaction-details', resolve);
        this.socket.once('error', reject);
      } else {
        reject(new Error('Socket not connected'));
      }
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
    if (this.watchlistSocket) {
      this.watchlistSocket.disconnect();
    }
    if (this.accountSocket) {
      this.accountSocket.disconnect();
    }
  }
}

export const useWebSocket = () => {
  const { token } = useAuth();
  const wsService = WebSocketService.getInstance();

  useEffect(() => {
    if (token) {
      wsService.setToken(token);
    }
  }, [token]);

  return wsService;
};

export default WebSocketService; 