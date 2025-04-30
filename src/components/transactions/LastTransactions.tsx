"use client";

import { Transaction, TransactionDetail } from '@/types/network';
import { fetchLastTransactions, fetchTransactionDetail } from '@/services/networkData';
import { useState, useEffect } from 'react';

interface LastTransactionsProps {
  onTransactionSelect: (transaction: TransactionDetail | null) => void;
}

export function LastTransactions({ onTransactionSelect }: LastTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data } = await fetchLastTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleAddressClick = (address: string) => {
    window.open(`https://solscan.io/account/${address}`, '_blank');
  };

  const handleTransactionClick = async (hash: string) => {
    setDetailLoading(true);
    try {
      const { data } = await fetchTransactionDetail(hash);
      onTransactionSelect(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transaction details');
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="h-64 bg-slate-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-medium text-white mb-4">Latest Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hash</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Signer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slot</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Block Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Instructions</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Program IDs</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {transactions.map((tx) => (
              <tr key={tx.tx_hash} className="hover:bg-slate-700/50">
                <td 
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 cursor-pointer hover:text-indigo-400"
                  onClick={() => handleTransactionClick(tx.tx_hash)}
                >
                  {tx.tx_hash.slice(0, 8)}...{tx.tx_hash.slice(-8)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tx.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {tx.fee}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 cursor-pointer hover:text-indigo-400"
                  onClick={() => handleAddressClick(tx.signer[0])}
                >
                  {tx.signer[0].slice(0, 8)}...{tx.signer[0].slice(-8)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {tx.slot}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {new Date(tx.block_time * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  <div className="space-y-1">
                    {tx.parsed_instructions.map((inst, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span 
                          className="text-indigo-400 cursor-pointer hover:text-indigo-300"
                          onClick={() => handleAddressClick(inst.program_id)}
                        >
                          {inst.program}:
                        </span>
                        <span>{inst.type}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  <div className="space-y-1">
                    {tx.program_ids.map((id, index) => (
                      <div 
                        key={index}
                        className="cursor-pointer hover:text-indigo-400"
                        onClick={() => handleAddressClick(id)}
                      >
                        {id.slice(0, 8)}...{id.slice(-8)}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {new Date(tx.time).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {detailLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
} 