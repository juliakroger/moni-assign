import { useContext } from "react";
import { WalletContext } from "../provider/Wallet"; // ajuste o caminho se precisar

const ConnectWallet = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext);

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <button
      onClick={connectWallet}
      disabled={walletAddress}
      className="bg-orange-400 rounded p-2 px-4 uppercase font-bold text-xs cursor-pointer"
    >
      {walletAddress ? shortenAddress(walletAddress) : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;
