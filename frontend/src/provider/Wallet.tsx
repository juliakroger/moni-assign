import { createContext, useState, useEffect, ReactNode } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  type Address,
  type PublicClient,
  type WalletClient,
} from "viem";
import { bscTestnet } from "viem/chains";

interface WalletContextType {
  walletAddress: Address | null;
  walletClient: WalletClient | null;
  publicClient: PublicClient | null;
  wrongNetwork: boolean;
  connectWallet: () => Promise<void>;
}

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  walletClient: null,
  wrongNetwork: false,
  connectWallet: async () => {},
});

const BINANCE_CHAINID = "0x61";

export const WalletConsumer = WalletContext.Consumer;

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletAddress, setWalletAddress] = useState<Address | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);

  const checkNetwork = async () => {
    if (!window.ethereum) return;
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    setWrongNetwork(chainId !== BINANCE_CHAINID);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("No MetaMask detected :(");
      return;
    }

    try {
      const client = createWalletClient({
        chain: bscTestnet,
        transport: custom(window.ethereum),
      });

      setWalletClient(client);

      const publicClient = createPublicClient({
        chain: bscTestnet,
        transport: custom(window.ethereum),
      });

      setPublicClient(publicClient);

      const [account] = await client.requestAddresses();
      setWalletAddress(account);

      checkNetwork();

      console.log("Wallet connected:", account);
    } catch (err) {
      console.error("Erro ao conectar wallet:", err);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    connectWallet();

    const handleAccountsChanged = async (accounts: Address[]) => {
      if (accounts.length === 0) {
        setWalletAddress(null);
        setWrongNetwork(false);
      } else {
        setWalletAddress(accounts[0]);
        console.log("Wallet switched:", accounts[0]);

        await checkNetwork();
      }
    };

    const handleChainChanged = (chainId: string) => {
      setWrongNetwork(chainId !== BINANCE_CHAINID);
      console.log("Network changed:", chainId);
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        walletClient,
        publicClient,
        wrongNetwork,
        connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
