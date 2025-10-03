import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../pages/App";
import Start from "../pages/Start";
import ConnectWallet from "../components/ConnectWallet";

const Root = () => {
  return (
    <div>
      <div className="w-full border-b p-3 px-20 border-[#2C2C2C] flex justify-end">
        <ConnectWallet />
      </div>
      <div className="w-full flex justify-center mt-3">
        <div className="max-w-7xl w-full">
          <BrowserRouter>
            <Routes>
              <Route index element={<App />} />
              <Route path="start/:id" element={<Start />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default Root;
