import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Root from "./routes/Root.tsx";
import { WalletProvider } from "./provider/Wallet.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WalletProvider>
      <Root />
    </WalletProvider>
  </StrictMode>
);
