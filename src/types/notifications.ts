export type NotificationType = 'transaction' | 'watchlist' | 'account' | 'system';

export interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  data?: any;
}

export interface TransactionNotification extends BaseNotification {
  type: 'transaction';
  data: {
    txHash: string;
    amount: number;
    from: string;
    to: string;
    token?: string;
  };
}

export interface WatchlistNotification extends BaseNotification {
  type: 'watchlist';
  data: {
    address: string;
    label: string;
    activityType: string;
    txHash: string;
  };
}

export interface AccountNotification extends BaseNotification {
  type: 'account';
  data: {
    address: string;
    changeType: 'balance' | 'portfolio' | 'token' | 'stake';
    oldValue: any;
    newValue: any;
  };
}

export interface SystemNotification extends BaseNotification {
  type: 'system';
  data: {
    event: string;
    details: any;
  };
}

export type Notification = 
  | TransactionNotification 
  | WatchlistNotification 
  | AccountNotification 
  | SystemNotification; 