"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, WalletIcon, ChartBarIcon, XMarkIcon, Bars3Icon, CurrencyDollarIcon, ArrowPathIcon, CubeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Wallet Analysis', href: '/dashboard/wallet', icon: WalletIcon },
  { name: 'Token Analysis', href: '/dashboard/token', icon: CurrencyDollarIcon },
  { name: 'Market Analysis', href: '/dashboard/market', icon: ShoppingCartIcon },
  { name: 'Transactional Analysis', href: '/dashboard/transactions', icon: ArrowPathIcon },
  { name: 'Block Analysis', href: '/dashboard/blocks', icon: CubeIcon },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-slate-900 z-30 transform transition-transform duration-300 ease-in-out",
          !isOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 pt-5">
            <h1 className="text-xl font-bold text-white">Solana Stae</h1>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-gray-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-white">Solana Network</p>
                  <p className="text-xs font-medium text-gray-400">Mainnet Beta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toggle button for closed sidebar */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-5 left-5 p-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 focus:outline-none z-30"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}
    </>
  );
}; 