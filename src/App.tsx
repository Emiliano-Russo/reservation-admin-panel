import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfirmEmail } from "./screens/ConfirmEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirm-email" element={<ConfirmEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
