import type { TransactionDetail as TransactionDetailType } from '@/types/network';

interface TransactionDetailProps {
  transaction: TransactionDetailType | null;
}

export function TransactionDetail({ transaction }: TransactionDetailProps) {
  if (!transaction) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Transaction Hash</h3>
            <p className="text-white break-all">{transaction.tx_hash}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Status</h3>
            <p className={`${
              transaction.tx_status === 'Success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {transaction.tx_status}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Block Time</h3>
            <p className="text-white">{new Date(transaction.block_time * 1000).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400">Fee</h3>
            <p className="text-white">{transaction.fee} SOL</p>
          </div>
        </div>

        {/* Signers */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Signers</h3>
          <div className="space-y-2">
            {transaction.signer.map((address, index) => (
              <p key={index} className="text-white break-all">
                {address}
              </p>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Instructions</h3>
          <div className="space-y-4">
            {transaction.parsed_instructions.map((inst, index) => (
              <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{inst.program}</p>
                    <p className="text-gray-400 text-sm">{inst.type}</p>
                  </div>
                  <p className="text-gray-400 text-sm">Index: {inst.ins_index}</p>
                </div>
                {inst.accounts.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">Accounts:</p>
                    <div className="space-y-1 mt-1">
                      {inst.accounts.map((account, accIndex) => (
                        <p key={accIndex} className="text-white text-sm break-all">
                          {account}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Balance Changes */}
        {transaction.sol_bal_change.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">SOL Balance Changes</h3>
            <div className="space-y-2">
              {transaction.sol_bal_change.map((change, index) => (
                <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-white break-all">Address: {change.address}</p>
                  <p className="text-white">Change: {change.change_amount} SOL</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 