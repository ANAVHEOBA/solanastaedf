"use client";

import { useState, useEffect } from 'react';
import { fetchBlockDetail } from '@/services/networkData';
import { BlockDetail as BlockDetailType } from '@/types/network';
import { formatDistanceToNow } from 'date-fns';

interface BlockDetailProps {
  blockHeight: number;
}

export function BlockDetail({ blockHeight }: BlockDetailProps) {
  const [block, setBlock] = useState<BlockDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlockDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchBlockDetail(blockHeight);
        if (response.success) {
          setBlock(response.data);
        }
      } catch (err) {
        setError('Failed to load block details');
        console.error('Error loading block details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlockDetail();
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

  if (!block) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-white">Block Details</h3>
      </div>
      <div className="border-t border-gray-700">
        <dl className="divide-y divide-gray-700">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Block Hash</dt>
            <dd className="mt-1 text-sm text-blue-400 break-all sm:mt-0 sm:col-span-2">
              {block.blockhash}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Slot</dt>
            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
              {block.slot}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Parent Slot</dt>
            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
              {block.parent_slot}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Previous Block Hash</dt>
            <dd className="mt-1 text-sm text-blue-400 break-all sm:mt-0 sm:col-span-2">
              {block.previous_block_hash}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Fee Rewards</dt>
            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
              {block.fee_rewards.toLocaleString()} SOL
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">MEV Rewards</dt>
            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
              {block.totalMevRewards} SOL
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Transactions</dt>
            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
              {block.transactions_count}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-300">Time</dt>
            <dd className="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
              {formatDistanceToNow(new Date(block.time), { addSuffix: true })}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
} 