const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_URL}/api/v1/auth/register`,
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
  },
  TRANSACTIONS: {
    LAST: `${BASE_URL}/api/v1/solscan/transaction/last`,
    DETAIL: `${BASE_URL}/api/v1/solscan/transaction/detail`,
    ACTIONS: `${BASE_URL}/api/v1/solscan/transaction/actions`,
  },
  WHALE_MONITOR: {
    WATCHLIST: `${BASE_URL}/api/v1/whale-monitor/watchlist`,
    WATCHLIST_ITEM: (id: string) => `${BASE_URL}/api/v1/whale-monitor/watchlist/${id}`,
  },
  TOKENS: {
    TRENDING: `${BASE_URL}/api/v1/solscan/token/trending`,
  },
}; 