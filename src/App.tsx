import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfirmEmail } from "./screens/ConfirmEmail";
import { Home } from "./screens/Home";
import { ResetPassword } from "./screens/ResetPassword";
import { PrivacyPolicy } from "./screens/PrivacyPolicy";
import { DeleteAccount } from "./screens/DeleteAccount";
import { Support } from "./screens/Support";
import { AdminPanel } from "./screens/admin/AdminPanel";
import { Reservations } from "./screens/admin/Reservations";
import { Business } from "./screens/admin/Business";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/account/delete" element={<DeleteAccount />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin-panel/reservations" element={<Reservations />} />
        <Route path="/admin-panel/business" element={<Business />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
