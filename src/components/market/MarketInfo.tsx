"use client";

import { useState, useEffect } from 'react';
import { fetchMarketInfo } from '@/services/networkData';
import { MarketInfo as MarketInfoType } from '@/types/network';

interface MarketInfoProps {
  address: string;
}

export const MarketInfo = ({ address }: MarketInfoProps) => {
  const [info, setInfo] = useState<MarketInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        setLoading(true);
        const response = await fetchMarketInfo(address);
        if (response.success) {
          setInfo(response.data);
        } else {
          setError('Failed to fetch market info');
        }
      } catch (err) {
        setError('An error occurred while fetching market info');
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      loadInfo();
    }
  }, [address]);

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

  if (!info) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Pool Information</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Pool Address</p>
            <p className="text-sm text-white break-all">{info.pool_address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Program ID</p>
            <p className="text-sm text-white break-all">{info.program_id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Creator</p>
            <p className="text-sm text-white break-all">{info.creator}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Created Time</p>
            <p className="text-sm text-white">{new Date(info.create_block_time * 1000).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-md font-semibold text-white mb-2">Tokens Information</h4>
          <div className="space-y-4">
            {info.tokens_info.map((token, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Token Address</p>
                    <p className="text-sm text-white break-all">{token.token}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Token Account</p>
                    <p className="text-sm text-white break-all">{token.token_account}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Amount</p>
                    <p className="text-sm text-white">{token.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 