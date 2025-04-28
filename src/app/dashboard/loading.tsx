export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-48 bg-gray-800 rounded-xl animate-pulse" />
          <div className="h-48 bg-gray-800 rounded-xl animate-pulse" />
        </div>

        <div className="h-64 bg-gray-800 rounded-xl animate-pulse" />
      </div>
    </div>
  );
} 