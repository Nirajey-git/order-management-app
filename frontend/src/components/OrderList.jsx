import { useEffect, useState } from "react";
import API from "../api";

export default function OrderList({ refresh }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders", {
        params: { page, perPage: 10, search },
      });
      setOrders(res.data.orders || []);
      setTotalPages(Math.ceil(res.data.total / res.data.perPage));
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, search, refresh]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Orders</h2>

      <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
        className="border p-2 rounded mb-4 w-full"
      />

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">UserID</th>
            <th className="border px-4 py-2 text-left">User</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Total Amount</th>
              <th className="border px-4 py-2 text-left">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{o.id}</td>
                <td className="border px-4 py-2">{o.userId}</td>
                <td className="border px-4 py-2">{o.user?.name || "N/A"}</td>

                <td className="border px-4 py-2">{o.status}</td>
                <td className="border px-4 py-2">{o.total}</td>
                <td className="border px-4 py-2">
                  <ul className="list-none list-inside">
                    {o.items.map((it) => (
                      <li key={it.id}>
                        {it.product?.name || "Product"} — {it.quantity} × ${it.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 border rounded">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
