export interface ParsedInstruction {
  type: string;
  program: string;
  program_id: string;
}

export interface Transaction {
  fee: number;
  signer: string[];
  slot: number;
  status: string;
  block_time: number;
  tx_hash: string;
  parsed_instructions: ParsedInstruction[];
  program_ids: string[];
  time: string;
}

export interface TransactionResponse {
  success: boolean;
  data: Transaction[];
  metadata: Record<string, unknown>;
}

export interface SolBalanceChange {
  address: string;
  pre_balance: string;
  post_balance: string;
  change_amount: string;
}

export interface TokenBalanceChange {
  address: string;
  change_type: string;
  change_amount: string;
  decimals: number;
  post_balance: string;
  pre_balance: string;
  token_address: string;
  owner: string;
  post_owner: string;
  pre_owner: string;
}

export interface Transfer {
  source_owner: string;
  source: string;
  destination: string;
  destination_owner: string;
  transfer_type: string;
  token_address: string;
  decimals: number;
  amount_str: string;
  amount: number;
  program_id: string;
  outer_program_id: string;
  ins_index: number;
  outer_ins_index: number;
  event: string;
  fee: Record<string, unknown>;
  base_value: {
    token_address: string;
    decimals: number;
    amount: number;
    amount_str: string;
  };
}

export interface ParsedInstructionDetail {
  ins_index: number;
  parsed_type: string;
  type: string;
  program_id: string;
  program: string;
  outer_program_id: string | null;
  outer_ins_index: number;
  data_raw: string | Record<string, unknown>;
  accounts: string[];
  activities: Record<string, unknown>[];
  transfers: Transfer[];
  inner_instructions: ParsedInstructionDetail[];
  program_invoke_level: number;
  idl_data?: Record<string, unknown>;
}

export interface AccountKey {
  pubkey: string;
  writable: boolean;
  signer: boolean;
  source: string;
}

export interface TransactionDetail {
  block_id: number;
  fee: number;
  reward: Record<string, unknown>[];
  sol_bal_change: SolBalanceChange[];
  token_bal_change: TokenBalanceChange[];
  tokens_involved: string[];
  parsed_instructions: ParsedInstructionDetail[];
  programs_involved: string[];
  signer: string[];
  list_signer: string[];
  status: number;
  account_keys: AccountKey[];
  compute_units_consumed: number;
  confirmations: number | null;
  version: number;
  priority_fee: number;
  tx_hash: string;
  block_time: number;
  address_table_lookup: Record<string, unknown>[];
  log_message: string[];
  recent_block_hash: string;
  tx_status: string;
}

export interface TransactionDetailResponse {
  success: boolean;
  data: TransactionDetail;
  metadata: {
    tokens: Record<string, {
      token_address: string;
      token_name: string;
      token_symbol: string;
      token_icon: string;
    }>;
  };
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    user?: AuthUser;
    token?: string;
    expiresIn?: string;
  };
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface TokenSwapData {
  amm_id: string;
  amm_authoriy: string | null;
  account: string;
  token_1: string;
  token_2: string;
  amount_1: number;
  amount_1_str: string;
  amount_2: number;
  amount_2_str: string;
  token_decimal_1: number;
  token_decimal_2: number;
  token_account_1_1: string;
  token_account_1_2: string;
  token_account_2_1: string;
  token_account_2_2: string;
  owner_1: string;
  owner_2: string;
}

export interface TransferData {
  amount: number;
  amount_str: string;
  decimals: number;
  destination: string;
  destination_owner: string;
  event: string;
  fee: Record<string, unknown>;
  source: string;
  source_owner: string;
  token_address: string;
}

export interface Activity {
  name: string;
  activity_type: string;
  program_id: string;
  data: Record<string, unknown>;
  ins_index: number;
  outer_ins_index: number;
  outer_program_id: string | null;
}

export interface Summary {
  title: {
    activity_type: string;
    program_id: string;
    data: TokenSwapData;
  };
  body: {
    activity_type: string;
    program_id: string;
    data: TransferData;
  }[];
}

export interface TransactionActions {
  tx_hash: string;
  block_id: number;
  block_time: number;
  time: string;
  fee: number;
  summaries: Summary[];
  transfers: Transfer[];
  activities: Activity[];
}

export interface TransactionActionsResponse {
  success: boolean;
  data: TransactionActions;
  metadata: {
    tokens: Record<string, {
      token_address: string;
      token_name: string;
      token_symbol: string;
      token_icon: string;
    }>;
  };
}

export interface WatchlistItem {
  id: string;
  userId: string;
  address: string;
  label: string;
  type: 'account' | 'token';
  notes: string;
  createdAt: string;
  updatedAt: string;
  tokenSymbol?: string;
  tokenName?: string;
  tokenDecimals?: number;
}

export interface WatchlistResponse {
  success: boolean;
  message: string;
  data: {
    item: WatchlistItem;
  };
}

export interface WatchlistRequest {
  address: string;
  label: string;
  type: 'account' | 'token';
  notes: string;
}

export interface WatchlistItemsResponse {
  success: boolean;
  message: string;
  data: {
    items: WatchlistItem[];
  };
}

export interface WatchlistDeleteResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}

export interface TrendingToken {
  address: string;
  decimals?: number;
  name: string;
  symbol: string;
}

export interface TrendingTokensResponse {
  success: boolean;
  data: TrendingToken[];
  metadata: Record<string, unknown>;
} 