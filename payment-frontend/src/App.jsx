import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PaymentPage from "./pages/PaymentPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex justify-between">
        <Link to="/" className="text-blue-600 font-semibold">💳 Payment</Link>
        <Link to="/history" className="text-blue-600 font-semibold">📜 History</Link>
      </nav>
      <div className="p-8">
        <Routes>
          <Route path="/" element={<PaymentPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
