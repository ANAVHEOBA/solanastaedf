"use client";

import { useState, useEffect } from 'react';
import { fetchTrendingTokens } from '@/services/networkData';
import { TrendingToken } from '@/types/network';

export const TrendingTokens = () => {
  const [tokens, setTokens] = useState<TrendingToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const loadTokens = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTrendingTokens(limit);
      if (response.success) {
        setTokens(response.data);
      } else {
        setError('Failed to load trending tokens');
      }
    } catch (err) {
      setError('An error occurred while loading tokens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTokens(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  if (loading && tokens.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Trending Tokens</h2>
      
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Decimals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {tokens.map((token) => (
              <tr key={token.address} className="hover:bg-slate-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{token.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{token.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 break-all">{token.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{token.decimals || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-400">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 