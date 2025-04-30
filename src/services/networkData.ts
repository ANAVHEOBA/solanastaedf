import { ENDPOINTS } from '@/lib/constants/endpoints';
import { 
  TransactionResponse, 
  TransactionDetailResponse, 
  TransactionActionsResponse,
  AuthResponse,
  AuthCredentials,
  WatchlistResponse,
  WatchlistRequest,
  WatchlistItemsResponse,
  WatchlistDeleteResponse,
  TrendingTokensResponse
} from '@/types/network';

export const fetchLastTransactions = async (limit: number = 10): Promise<TransactionResponse> => {
  const response = await fetch(`${ENDPOINTS.TRANSACTIONS.LAST}?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const fetchTransactionDetail = async (txHash: string): Promise<TransactionDetailResponse> => {
  const response = await fetch(`${ENDPOINTS.TRANSACTIONS.DETAIL}?tx=${txHash}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction detail');
  }
  return response.json();
};

export const fetchTransactionActions = async (txHash: string): Promise<TransactionActionsResponse> => {
  const response = await fetch(`${ENDPOINTS.TRANSACTIONS.ACTIONS}?tx=${txHash}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction actions');
  }
  return response.json();
};

export const register = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const errorMessage = data.message || 'Failed to register';
    throw new Error(errorMessage);
  }
  
  return data;
};

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    const errorMessage = data.message || 'Failed to login';
    throw new Error(errorMessage);
  }
  
  return data;
};

export const addToWatchlist = async (token: string, data: WatchlistRequest): Promise<WatchlistResponse> => {
  const response = await fetch(ENDPOINTS.WHALE_MONITOR.WATCHLIST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData.message || 'Failed to add to watchlist';
    throw new Error(errorMessage);
  }
  
  return responseData;
};

export const fetchWatchlist = async (token: string): Promise<WatchlistItemsResponse> => {
  const response = await fetch(ENDPOINTS.WHALE_MONITOR.WATCHLIST, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData.message || 'Failed to fetch watchlist';
    throw new Error(errorMessage);
  }
  
  return responseData;
};

export const deleteWatchlistItem = async (token: string, id: string): Promise<WatchlistDeleteResponse> => {
  const response = await fetch(ENDPOINTS.WHALE_MONITOR.WATCHLIST_ITEM(id), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData.message || 'Failed to delete watchlist item';
    throw new Error(errorMessage);
  }
  
  return responseData;
};

export const fetchTrendingTokens = async (limit: number = 10): Promise<TrendingTokensResponse> => {
  const response = await fetch(`${ENDPOINTS.TOKENS.TRENDING}?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch trending tokens');
  }
  return response.json();
};