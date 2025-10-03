interface Props {
  transactions: {}[];
}

const History = ({ transactions }: Props) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs uppercase p-2 mb-2">
        <div>id</div>
        <div>hash</div>
        <div>amount</div>
        <div>date</div>
        <div>status</div>
      </div>
      {transactions.length ? (
        transactions.map(
          ({ id, token, amount, status, transactionHash, date }) => (
            <div
              key={id}
              className="flex justify-between gap-4 border border-orange-400 bg-[#181818] rounded p-2"
            >
              <div>{id}</div>
              <a
                href={`https://testnet.bscscan.com/tx/${transactionHash}`}
                className="text-blue-400"
              >
                {transactionHash.slice(0, 10)}...
              </a>
              <div>
                {amount} {token}
              </div>
              <div>{date}</div>
              <div>{status}</div>
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
