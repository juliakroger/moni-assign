import moment from "moment";

interface Props {
  transactions: {
    _id: string;
    token?: string;
    amount?: string;
    status?: string;
    transactionHash?: string;
    date?: string;
    receiverWallet?: string;
    senderWallet?: string;
  }[];
  walletAddress: string;
}

const History = ({ transactions, walletAddress }: Props) => {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-6 text-xs uppercase p-2 mb-2">
        <div>id</div>
        <div className="flex justify-center">hash</div>
        <div className="flex justify-center">amount</div>
        <div className="flex justify-center">type</div>
        <div className="flex justify-center">created</div>
        <div className="flex justify-end">status</div>
      </div>

      {transactions.length ? (
        transactions.map(
          ({
            _id,
            token,
            amount,
            status,
            transactionHash,
            date,
            receiverWallet,
            senderWallet,
          }) => (
            <div
              key={_id}
              className="grid grid-cols-6 gap-4 border border-orange-400 bg-[#181818] rounded p-2 text-sm"
            >
              <div className="text-blue-400 hover:underline">
                <a
                  href={`/start/${_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {_id}
                </a>
              </div>

              <div className="flex justify-center">
                {transactionHash ? (
                  <a
                    href={`https://testnet.bscscan.com/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {transactionHash?.slice(0, 10)}...
                  </a>
                ) : (
                  <div>no transaction</div>
                )}
              </div>

              <div className="flex justify-center">
                {amount} {token}
              </div>

              {status !== "PENDING" ? (
                receiverWallet === walletAddress ? (
                  <div className="font-bold text-green-400 text-center">
                    RECEIVED
                  </div>
                ) : senderWallet === walletAddress ? (
                  <div className="font-bold text-red-400 text-center">SENT</div>
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )}

              <div className="flex justify-center">
                {moment(date).fromNow()}
              </div>

              <div className="flex justify-end">{status}</div>
            </div>
          )
        )
      ) : (
        <div className="flex justify-center gap-4 border border-orange-400 bg-[#181818] rounded p-2">
          No history.
        </div>
      )}
    </div>
  );
};

export default History;
