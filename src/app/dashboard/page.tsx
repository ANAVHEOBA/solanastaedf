"use client";

import { useState, useEffect } from 'react';
import { LastBlocks } from '@/components/blocks/LastBlocks';
import { LastTransactions } from '@/components/transactions/LastTransactions';
import { TransactionDetail } from '@/components/transactions/TransactionDetail';
import { TransactionActions } from '@/components/transactions/TransactionActions';
import { MarketList } from '@/components/market/MarketList';
import { TransactionDetail as TransactionDetailType, TransactionActions as TransactionActionsType } from '@/types/network';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetailType | null>(null);
  const [selectedActions, setSelectedActions] = useState<TransactionActionsType | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTransactionSelect = (transaction: TransactionDetailType | null) => {
    setSelectedTransaction(transaction);
  };

  const handleActionsSelect = (actions: TransactionActionsType | null) => {
    setSelectedActions(actions);
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">Solana Dashboard</h1>
            <div className="text-sm text-gray-400">
              Last updated: {currentTime}
            </div>
          </div>

          <MarketList />

          <LastBlocks />

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
      </div>
    </div>
  );
}