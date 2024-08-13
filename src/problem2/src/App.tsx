import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MODAL_STATUS } from "types";

import { SwapForm } from "pages/SwapForm";
import { Header } from "components/layout";
import { WalletModal } from "components/modals";

import { appStyles } from "./styles";

const App = () => {
  const [isWalletModalOpened, setIsWalletModalOpen] = useState<MODAL_STATUS>(
    MODAL_STATUS.FIRST_TIME_LOADED,
  );

  const closeWalletModal = () => {
    setIsWalletModalOpen(MODAL_STATUS.CLOSED);
  };

  const openWalletModal = () => {
    setIsWalletModalOpen(MODAL_STATUS.OPENED);
  };

  return (
    <div className={`App ${appStyles}`}>
      <Header openWalletModal={openWalletModal} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SwapForm openWalletModal={openWalletModal} />}
          />
        </Routes>
      </BrowserRouter>
      <WalletModal isOpen={isWalletModalOpened} close={closeWalletModal} />
    </div>
  );
};

export default App;
