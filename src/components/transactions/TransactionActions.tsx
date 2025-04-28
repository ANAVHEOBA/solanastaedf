import type { TransactionActions } from '@/types/network';

interface TransactionActionsProps {
  actions: TransactionActions | null;
}

export function TransactionActions({ actions }: TransactionActionsProps) {
  if (!actions) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Transaction Hash</h3>
            <p className="text-white break-all">{actions.tx_hash}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Block Time</h3>
            <p className="text-white">{new Date(actions.block_time * 1000).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Fee</h3>
            <p className="text-white">{actions.fee} SOL</p>
          </div>
        </div>

        {/* Summaries */}
        {actions.summaries.map((summary, index) => (
          <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-400">Activity Type</h3>
              <p className="text-white">{summary.title.activity_type}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-400">Program</h3>
              <p className="text-white">{summary.title.program_id}</p>
            </div>
            {summary.title.activity_type === 'ACTIVITY_TOKEN_SWAP' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Token Swap Details</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-gray-400 text-sm">Token 1</p>
                      <p className="text-white">{summary.title.data.token_1}</p>
                      <p className="text-white">{summary.title.data.amount_1_str}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Token 2</p>
                      <p className="text-white">{summary.title.data.token_2}</p>
                      <p className="text-white">{summary.title.data.amount_2_str}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {summary.body.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Transfers</h3>
                <div className="space-y-4">
                  {summary.body.map((transfer, tIndex) => (
                    <div key={tIndex} className="bg-slate-600/50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Source</p>
                          <p className="text-white break-all">{transfer.data.source}</p>
                          <p className="text-white break-all">Owner: {transfer.data.source_owner}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Destination</p>
                          <p className="text-white break-all">{transfer.data.destination}</p>
                          <p className="text-white break-all">Owner: {transfer.data.destination_owner}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-400 text-sm">Amount</p>
                        <p className="text-white">{transfer.data.amount_str}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Activities */}
        {actions.activities.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Activities</h3>
            <div className="space-y-4">
              {actions.activities.map((activity, index) => (
                <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{activity.name}</p>
                      <p className="text-gray-400 text-sm">{activity.activity_type}</p>
                    </div>
                    <p className="text-gray-400 text-sm">Program: {activity.program_id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 