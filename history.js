const BACKEND_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://payment-be-8.onrender.com";

let currentPage = 1;
const limit = 10;

async function loadTransactions(page = 1) {
  const res = await fetch(`${BACKEND_URL}/transactions?page=${page}&limit=${limit}`);
  const data = await res.json();

  const tbody = document.getElementById("transaction-table");
  tbody.innerHTML = "";

  data.data.forEach(txn => {
    const row = `
      <tr>
        <td>${txn.paymentIntentId}</td>
        <td>${(txn.amount / 100).toFixed(2)}</td>
        <td>${txn.currency.toUpperCase()}</td>
        <td>${txn.status}</td>
        <td>${new Date(txn.createdAt).toLocaleString()}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  document.getElementById("page-info").textContent = `Page ${data.page} of ${data.totalPages}`;

  document.getElementById("prev-page").disabled = data.page === 1;
  document.getElementById("next-page").disabled = data.page === data.totalPages;
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadTransactions(currentPage);
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  currentPage++;
  loadTransactions(currentPage);
});

loadTransactions(currentPage);
