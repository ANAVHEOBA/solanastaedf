"use client";

import { useState } from 'react';
import { LastTransactions } from '@/components/transactions/LastTransactions';
import { TransactionDetail } from '@/components/transactions/TransactionDetail';
import type { TransactionDetail as TransactionDetailType } from '@/types/network';

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetailType | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Transaction History</h1>
      </div>

      <LastTransactions 
        onTransactionSelect={setSelectedTransaction}
      />

      <TransactionDetail
        transaction={selectedTransaction}
      />
    </div>
  );
} 