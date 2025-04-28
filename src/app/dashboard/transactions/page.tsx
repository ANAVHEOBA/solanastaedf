"use client";

import { useState } from 'react';
import { LastTransactions } from '@/components/transactions/LastTransactions';
import { TransactionDetail } from '@/components/transactions/TransactionDetail';
import { TransactionActions } from '@/components/transactions/TransactionActions';
import type { TransactionDetail as TransactionDetailType, TransactionActions as TransactionActionsType } from '@/types/network';

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetailType | null>(null);
  const [selectedActions, setSelectedActions] = useState<TransactionActionsType | null>(null);

  const handleTransactionSelect = (transaction: TransactionDetailType | null) => {
    setSelectedTransaction(transaction);
  };

  const handleActionsSelect = (actions: TransactionActionsType | null) => {
    setSelectedActions(actions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Transaction History</h1>
      </div>

      <LastTransactions 
        onTransactionSelect={handleTransactionSelect}
        onActionsSelect={handleActionsSelect}
      />

      {selectedTransaction && (
        <>
          <TransactionDetail
            transaction={selectedTransaction}
          />
          <TransactionActions
            actions={selectedActions}
          />
        </>
      )}
    </div>
  );
} 