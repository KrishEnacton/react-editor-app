import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Merchant from "./pages/Merchant";
import AllMerchants from "./pages/AllMerchants";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>
       <ToastContainer limit={1} />
      <Routes>
        <Route path="/" element={<AllMerchants />} />
        <Route path="/merchant/:merchantId" element={<Merchant />} />
      </Routes>
    </div>
  );
}

export default App;
