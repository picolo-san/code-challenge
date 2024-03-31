import { BrowserRouter, Routes, Route } from "react-router-dom";

import SwapForm from "pages/SwapForm";
import Header from "components/layout/Header";
import { appStyles } from "./styles";

const App = () => (
  <div className={`App ${appStyles}`}>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SwapForm />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
