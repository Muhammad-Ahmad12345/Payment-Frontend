import { useState, useEffect } from "react";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async (pageNum) => {
    const res = await fetch(`http://localhost:4000/transactions?page=${pageNum}`);
    const data = await res.json();
    setTransactions(data.transactions);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Payment Intent ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Currency</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.paymentIntentId}>
              <td className="border p-2">{tx.paymentIntentId}</td>
              <td className="border p-2">${(tx.amount / 100).toFixed(2)}</td>
              <td className="border p-2 uppercase">{tx.currency}</td>
              <td className="border p-2">{tx.status}</td>
              <td className="border p-2">
                {new Date(tx.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>{page} / {totalPages}</span>
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
