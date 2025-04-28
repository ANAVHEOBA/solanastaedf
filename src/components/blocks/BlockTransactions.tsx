"use client";

import { useState, useEffect } from 'react';
import { fetchBlockTransactions } from '@/services/networkData';
import { Transaction } from '@/types/network';
import { formatDistanceToNow } from 'date-fns';

interface BlockTransactionsProps {
  blockHeight: number;
}

export function BlockTransactions({ blockHeight }: BlockTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetchBlockTransactions(blockHeight);
        if (response.success) {
          setTransactions(response.data.transactions);
          setTotal(response.data.total);
        }
      } catch (err) {
        setError('Failed to load block transactions');
        console.error('Error loading block transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [blockHeight]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-white">
          Transactions in Block {blockHeight} ({total} total)
        </h3>
      </div>
      <div className="border-t border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hash
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Fee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {transactions.map((tx) => (
              <tr key={tx.tx_hash} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 break-all">
                  {tx.tx_hash}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {tx.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {tx.fee.toLocaleString()} SOL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatDistanceToNow(new Date(tx.time), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 