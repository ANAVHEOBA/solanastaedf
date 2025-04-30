"use client";

import { useState, useEffect } from 'react';
import { LastTransactions } from '@/components/transactions/LastTransactions';
import { TransactionDetail } from '@/components/transactions/TransactionDetail';
import { TrendingTokens } from '@/components/tokens/TrendingTokens';
import { TransactionDetail as TransactionDetailType } from '@/types/network';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetailType | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

          <TrendingTokens />

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          </div>

          <LastTransactions 
            onTransactionSelect={setSelectedTransaction}
          />

          <TransactionDetail
            transaction={selectedTransaction}
          />
        </div>
      </div>
    </div>
  );
}