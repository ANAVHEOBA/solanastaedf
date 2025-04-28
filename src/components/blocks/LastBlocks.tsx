"use client";

import { useState, useEffect } from 'react';
import { fetchLastBlocks } from '@/services/networkData';
import { Block } from '@/types/network';
import { formatDistanceToNow } from 'date-fns';
import { BlockTransactions } from './BlockTransactions';
import { BlockDetail } from './BlockDetail';

export function LastBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        setLoading(true);
        const response = await fetchLastBlocks();
        if (response.success) {
          setBlocks(response.data);
        }
      } catch (err) {
        setError('Failed to load blocks');
        console.error('Error loading blocks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlocks();
  }, []); // Only fetch on mount

  const handleBlockClick = (blockHeight: number) => {
    setSelectedBlock(blockHeight === selectedBlock ? null : blockHeight);
  };

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
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-white">Latest Blocks</h3>
      </div>
      <div className="border-t border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Block Height
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Hash
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Transactions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Fee Rewards
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {blocks.map((block) => (
              <tr 
                key={block.blockhash} 
                className={`hover:bg-gray-700 cursor-pointer ${selectedBlock === block.block_height ? 'bg-gray-700' : ''}`}
                onClick={() => handleBlockClick(block.block_height)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {block.block_height}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 break-all">
                  {block.blockhash}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {block.transactions_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {block.fee_rewards.toLocaleString()} SOL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatDistanceToNow(new Date(block.time), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBlock && (
        <>
          <BlockDetail blockHeight={selectedBlock} />
          <BlockTransactions blockHeight={selectedBlock} />
        </>
      )}
    </div>
  );
} 