"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWatchlist, deleteWatchlistItem } from '@/services/networkData';
import { WatchlistItem } from '@/types/network';

export function WatchlistItems() {
  const { token } = useAuth();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const loadWatchlist = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await fetchWatchlist(token);
      setItems(response.data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    
    try {
      setDeletingId(id);
      await deleteWatchlistItem(token, id);
      setItems(items.filter(item => item.id !== id));
      setShowConfirm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setDeletingId(null);
    }
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
      <div className="text-red-400 text-center p-4">
        {error}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-gray-400 text-center p-4">
        No items in watchlist
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">{item.label}</h3>
                <p className="text-gray-400 text-sm break-all">{item.address}</p>
                {item.type === 'token' && (
                  <div className="mt-2">
                    <p className="text-gray-400 text-sm">
                      {item.tokenName} ({item.tokenSymbol})
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-gray-400 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <button
                  onClick={() => setShowConfirm(item.id)}
                  disabled={deletingId === item.id}
                  className="text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  {deletingId === item.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                  ) : (
                    '✕'
                  )}
                </button>
              </div>
            </div>
            {item.notes && (
              <div className="mt-2">
                <p className="text-gray-400 text-sm">{item.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showConfirm)}
                disabled={deletingId === showConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === showConfirm ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 