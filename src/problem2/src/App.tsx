import { BrowserRouter, Routes, Route } from "react-router-dom";

import SwapForm from "pages/SwapForm";
import Header from "components/layout/Header";
import { Container } from "./styles";

const App = () => (
  <Container className="App">
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SwapForm />} />
      </Routes>
    </BrowserRouter>
  </Container>
);

export default App;
