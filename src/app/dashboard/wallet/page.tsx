"use client";

import { WatchlistForm } from '@/components/wallet/WatchlistForm';
import { WatchlistItems } from '@/components/wallet/WatchlistItems';

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Wallet Analysis</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800 rounded-xl">
            <WatchlistForm />
          </div>
          
          <div className="bg-slate-800 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Your Watchlist</h2>
            <WatchlistItems />
          </div>
        </div>
      </div>
    </div>
  );
} 