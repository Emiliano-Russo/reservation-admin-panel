import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfirmEmail } from "./screens/ConfirmEmail";
import { Home } from "./screens/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
