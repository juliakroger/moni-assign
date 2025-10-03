import { useState } from "react";
import History from "../components/History";
import { useFetch } from "../queries/api";

const App = () => {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const { data: transactions } = useFetch("/transactions");

  const createTransaction = () => {};

  return (
    <div className="text-white p-4 grid grid-cols-2 gap-20">
      <div>
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
          onClick={createTransaction}
          className="mt-2 bg-orange-400 rounded p-2 px-4 uppercase font-bold text-xs cursor-pointer w-full"
        >
          charge
        </button>
      </div>

      <div>
        <div className="text-xs uppercase">history</div>
        {transactions && <History transactions={transactions} />}
      </div>
    </div>
  );
};

export default App;
