"use client";

import { Sidebar } from '@/components/ui/Sidebar';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isOpen ? "pl-64" : "pl-0"
        )}
      >
        <header className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <NotificationCenter />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
} 