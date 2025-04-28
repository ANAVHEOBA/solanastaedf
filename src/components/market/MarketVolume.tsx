"use client";

import { useState, useEffect } from 'react';
import { fetchMarketVolume } from '@/services/networkData';
import { MarketVolume as MarketVolumeType } from '@/types/network';

interface MarketVolumeProps {
  address: string;
}

export const MarketVolume = ({ address }: MarketVolumeProps) => {
  const [volume, setVolume] = useState<MarketVolumeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVolume = async () => {
      try {
        setLoading(true);
        const response = await fetchMarketVolume(address);
        if (response.success) {
          setVolume(response.data);
        } else {
          setError('Failed to fetch market volume');
        }
      } catch (err) {
        setError('An error occurred while fetching market volume');
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      loadVolume();
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

  if (!volume) {
    return null;
  }

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString();
  };

  const formatPercentage = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '0.00';
    return num.toFixed(2);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Volume & Trade Statistics</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">24h Volume</p>
            <p className="text-sm text-white">{formatNumber(volume.total_volume_24h)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Volume Change (24h)</p>
            <p className={`text-sm ${(volume.total_volume_change_24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(volume.total_volume_change_24h)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">24h Trades</p>
            <p className="text-sm text-white">{formatNumber(volume.total_trades_24h)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Trades Change (24h)</p>
            <p className={`text-sm ${(volume.total_trades_change_24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(volume.total_trades_change_24h)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 