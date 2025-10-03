interface Props {
  transactions: {
    _id: string;
    token?: string;
    amount?: string;
    status?: string;
    transactionHash?: string;
    date?: string;
  }[];
}

const History = ({ transactions }: Props) => {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-5 text-xs uppercase p-2 mb-2">
        <div>id</div>
        <div className="flex justify-center">hash</div>
        <div className="flex justify-center">amount</div>
        <div className="flex justify-center">date</div>
        <div className="flex justify-end">status</div>
      </div>

      {transactions.length ? (
        transactions.map(
          ({ _id, token, amount, status, transactionHash, date }) => (
            <div
              key={_id}
              className="grid grid-cols-5 gap-4 border border-orange-400 bg-[#181818] rounded p-2"
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

              <div className="flex justify-center">{date}</div>

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
