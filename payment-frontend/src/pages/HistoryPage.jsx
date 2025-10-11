import { useState, useEffect } from "react";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const BACKEND_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://payment-be-8.onrender.com";

  const fetchTransactions = async (pageNum) => {
    try {
      const res = await fetch(`${BACKEND_URL}/transactions?page=${pageNum}&limit=10`);
      const data = await res.json();
      setTransactions(data.data || data.transactions || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">💰 Payment History</h2>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ⬅ Back to Payment
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-sm text-gray-700">Payment ID</th>
                <th className="text-left px-4 py-2 text-sm text-gray-700">Amount (USD)</th>
                <th className="text-left px-4 py-2 text-sm text-gray-700">Currency</th>
                <th className="text-left px-4 py-2 text-sm text-gray-700">Status</th>
                <th className="text-left px-4 py-2 text-sm text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx.paymentIntentId} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-gray-800">{tx.paymentIntentId}</td>
                    <td className="px-4 py-2 text-gray-800">${(tx.amount / 100).toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-800 uppercase">{tx.currency}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tx.status === "succeeded"
                            ? "bg-green-100 text-green-700"
                            : tx.status === "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <p className="text-gray-700">
            Page {page} of {totalPages}
          </p>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
