"use client";

import { useState, useEffect } from 'react';
import { fetchMarketList } from '@/services/networkData';
import { MarketPool } from '@/types/network';
import { MarketInfo } from './MarketInfo';
import { MarketVolume } from './MarketVolume';

export const MarketList = () => {
  const [marketPools, setMarketPools] = useState<MarketPool[]>([]);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        setLoading(true);
        const response = await fetchMarketList();
        if (response.success) {
          setMarketPools(response.data);
        } else {
          setError('Failed to fetch market data');
        }
      } catch (err) {
        setError('An error occurred while fetching market data');
      } finally {
        setLoading(false);
      }
    };

    loadMarketData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Market Pools</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pool Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Program ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Token 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Token 2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created Time</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {marketPools.map((pool, index) => (
              <>
                <tr 
                  key={index} 
                  className={`hover:bg-gray-700 cursor-pointer ${selectedPool === pool.pool_address ? 'bg-gray-700' : ''}`}
                  onClick={() => setSelectedPool(selectedPool === pool.pool_address ? null : pool.pool_address)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 break-all">{pool.pool_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 break-all">{pool.program_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 break-all">{pool.token1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 break-all">{pool.token2}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(pool.created_time * 1000).toLocaleString()}
                  </td>
                </tr>
                {selectedPool === pool.pool_address && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="space-y-4">
                        <MarketInfo address={pool.pool_address} />
                        <MarketVolume address={pool.pool_address} />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 