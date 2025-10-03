import { useContext, useState } from "react";
import History from "../components/History";
import { useFetch, createTransaction } from "../queries/api";
import { WalletContext } from "../provider/Wallet";

const App = () => {
  const { walletAddress } = useContext(WalletContext);

  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const { data: transactions, refetch } = useFetch("/transactions");

  const handleTransaction = async () => {
    if (!amount || !walletAddress) return;
    const result = await createTransaction(amount, walletAddress);
    if (!result) return;
    refetch();
    setTransactionId(result._id);
  };

  return (
    <div className="text-white p-4 flex flex-col gap-4">
      <div className="p-2 bg-[#2A2A2A] rounded">
        <div className="text-xs uppercase">
          charge (only BNB otherwise I'll be here till monday)
        </div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0001"
          className="w-full border border-orange-400 bg-[#181818] mt-12 rounded p-2"
        />
        <button
          onClick={handleTransaction}
          disabled={!walletAddress || !amount}
          className="mt-2 bg-orange-400 rounded p-2 px-4 uppercase font-bold text-xs cursor-pointer w-full disabled:opacity-30 disabled:cursor-not-allowed"
        >
          charge
        </button>

        <div className="h-10 mt-2">
          {transactionId ? (
            <div className="text-blue-400 hover:underline">
              <a
                href={`/start/${transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${window.location.origin}/start/${transactionId}`}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <div className="text-xs uppercase">history</div>
        {transactions && <History transactions={transactions} />}
      </div>
    </div>
  );
};

export default App;
