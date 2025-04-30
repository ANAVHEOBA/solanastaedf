"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { addToWatchlist } from '@/services/networkData';
import { WatchlistRequest } from '@/types/network';

export function WatchlistForm() {
  const { token } = useAuth();
  const [formData, setFormData] = useState<WatchlistRequest>({
    address: '',
    label: '',
    type: 'account',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!token) {
        throw new Error('You must be logged in to add to watchlist');
      }

      await addToWatchlist(token, formData);
      setSuccess(true);
      setFormData({
        address: '',
        label: '',
        type: 'account',
        notes: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to watchlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Add to Watchlist</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="Enter Solana address"
          />
        </div>

        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-400 mb-1">
            Label
          </label>
          <input
            id="label"
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            placeholder="Enter a label for this address"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">
            Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'account' | 'token' })}
            className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="account">Account</option>
            <option value="token">Token</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            placeholder="Add any notes about this address"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-400 text-sm">
            Successfully added to watchlist!
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add to Watchlist'}
        </button>
      </form>
    </div>
  );
} 