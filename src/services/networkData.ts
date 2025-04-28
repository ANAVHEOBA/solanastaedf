import { ENDPOINTS } from '@/lib/constants/endpoints';
import { TransactionResponse, TransactionDetailResponse, TransactionActionsResponse, BlockResponse, BlockTransactionsResponse, BlockDetailResponse, MarketResponse, MarketInfoResponse, MarketVolumeResponse } from '@/types/network';

export const fetchLastBlocks = async (limit: number = 10): Promise<BlockResponse> => {
  const response = await fetch(`${ENDPOINTS.BLOCKS.LAST}?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blocks');
  }
  return response.json();
};

export const fetchBlockDetail = async (block: number): Promise<BlockDetailResponse> => {
  const response = await fetch(`${ENDPOINTS.BLOCKS.DETAIL}?block=${block}`);
  if (!response.ok) {
    throw new Error('Failed to fetch block detail');
  }
  return response.json();
};

export const fetchBlockTransactions = async (
  block: number,
  page: number = 1,
  pageSize: number = 10,
  excludeVote: boolean = true
): Promise<BlockTransactionsResponse> => {
  const response = await fetch(
    `${ENDPOINTS.BLOCKS.TRANSACTIONS}?block=${block}&page=${page}&page_size=${pageSize}&exclude_vote=${excludeVote}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch block transactions');
  }
  return response.json();
};

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

export const fetchMarketList = async (
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'created_time',
  sortOrder: string = 'desc'
): Promise<MarketResponse> => {
  const response = await fetch(
    `${ENDPOINTS.MARKET.LIST}?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch market list');
  }
  return response.json();
};

export const fetchMarketInfo = async (address: string): Promise<MarketInfoResponse> => {
  const response = await fetch(`${ENDPOINTS.MARKET.INFO}?address=${address}`);
  if (!response.ok) {
    throw new Error('Failed to fetch market info');
  }
  return response.json();
};

export const fetchMarketVolume = async (
  address: string,
  timeRange: string[] = []
): Promise<MarketVolumeResponse> => {
  const timeParams = timeRange.map(t => `time[]=${t}`).join('&');
  const response = await fetch(
    `${ENDPOINTS.MARKET.VOLUME}?address=${address}${timeParams ? `&${timeParams}` : ''}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch market volume');
  }
  return response.json();
}; 