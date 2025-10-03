import { createContext, useState, useEffect, ReactNode } from "react";
import {
  createWalletClient,
  custom,
  type Address,
  type WalletClient,
} from "viem";
import { bscTestnet } from "viem/chains";

interface WalletContextType {
  walletAddress: Address | null;
  walletClient: WalletClient | null;
  connectWallet: () => Promise<void>;
}

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  walletClient: null,
  connectWallet: async () => {},
});

export const WalletConsumer = WalletContext.Consumer;

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletClient, setWalletClient] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("No MetaMask detected :(");
      return;
    }

    try {
      // cria o cliente de carteira
      const client = createWalletClient({
        chain: bscTestnet,
        transport: custom(window.ethereum),
      });

      setWalletClient(client);

      // pede para o usuário conectar
      const [account] = await client.requestAddresses();

      setWalletAddress(account);
      console.log("Wallet connected:", account);
    } catch (err) {
      console.error("Erro ao conectar wallet:", err);
    }
  };

  useEffect(() => {
    // tenta reconectar se já tiver autorização
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ walletAddress, walletClient, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
