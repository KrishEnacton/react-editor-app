import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Merchant from "./pages/Merchant";
import AllMerchants from "./pages/AllMerchants";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllMerchants />} />
        <Route path="/merchant/:merchantId" element={<Merchant />} />
      </Routes>
    </div>
  );
}

export default App;
