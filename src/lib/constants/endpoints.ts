const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  BLOCKS: {
    LAST: `${BASE_URL}/api/v1/solscan/block/last`,
    TRANSACTIONS: `${BASE_URL}/api/v1/solscan/block/transactions`,
    DETAIL: `${BASE_URL}/api/v1/solscan/block/detail`,
  },
  TRANSACTIONS: {
    LAST: `${BASE_URL}/api/v1/solscan/transaction/last`,
    DETAIL: `${BASE_URL}/api/v1/solscan/transaction/detail`,
    ACTIONS: `${BASE_URL}/api/v1/solscan/transaction/actions`,
  },
  MARKET: {
    LIST: `${BASE_URL}/api/v1/solscan/market/list`,
    INFO: `${BASE_URL}/api/v1/solscan/market/info`,
    VOLUME: `${BASE_URL}/api/v1/solscan/market/volume`,
  },
}; 