import { useParams } from "react-router-dom";
import { useFetch, updateTransaction } from "../queries/api";
import { useContext } from "react";
import { WalletContext } from "../provider/Wallet";
import { parseEther } from "viem";

const Start = () => {
  const { id } = useParams<{ id: string }>();
  const { walletAddress, wrongNetwork, walletClient, publicClient } =
    useContext(WalletContext);
  const {
    data: transaction,
    isLoading,
    error,
    refetch,
  } = useFetch(`/transaction/${id}`);

  if (isLoading) return <div className="text-white p-4">Loading...</div>;
  if (error)
    return <div className="text-white p-4">Error loading transaction</div>;
  if (!transaction)
    return <div className="text-white p-4">Transaction not found</div>;

  if (transaction.status === "APPROVED") {
    return (
      <div className="text-white p-4 flex justify-center">
        <div className="p-2 bg-[#2A2A2A] rounded w-120 text-center flex flex-col gap-4">
          <div className="text-bold">TRANSACTION COMPLETED</div>
          <a
            href="/"
            className="mt-2 bg-orange-400 rounded p-2 px-4 uppercase font-bold text-xs cursor-pointer w-full disabled:opacity-30 disabled:cursor-not-allowed"
          >
            go to dashboard
          </a>
        </div>
      </div>
    );
  }

  const handleTransaction = async () => {
    if (!walletClient || !publicClient || !walletAddress || !id) return;

    try {
      const hash = await walletClient.sendTransaction({
        to: transaction.receiverWallet,
        value: parseEther(transaction.amount),
        account: walletAddress,
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      await updateTransaction(
        id,
        hash,
        receipt.status === "success" ? "APPROVED" : "FAILED",
        walletAddress
      );

      refetch();
    } catch (error) {
      console.log("Failed to make transaction", error);
    }
  };

  return (
    <div className="text-white p-4 flex justify-center">
      <div className="p-2 bg-[#2A2A2A] rounded w-120">
        <div className="text-xs uppercase text-center">PAY</div>
        <div className="flex flex-col gap-4 mt-12">
          <div>
            <label className="text-xs">Amount</label>
            <input
              value={`${transaction.amount} BNB`}
              disabled
              className="w-full bg-[#181818] rounded p-2"
            />
          </div>

          <div>
            <label className="text-xs">Receiver</label>
            <input
              value={`${transaction.receiverWallet}`}
              disabled
              className="w-full bg-[#181818] rounded p-2"
            />
          </div>

          <button
            disabled={
              transaction.receiverWallet.toLowerCase() ===
                walletAddress?.toLowerCase() || wrongNetwork
            }
            onClick={handleTransaction}
            className="mt-2 bg-orange-400 rounded p-2 px-4 uppercase font-bold text-xs cursor-pointer w-full disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {wrongNetwork ? "please switch to BSC testnet" : "transfer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
