import { useState } from "react";
import API from "../api";

export default function OrderForm({ onOrderCreated }) {
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1 }]);
  const [createdOrder, setCreatedOrder] = useState(null);

  const handleAddItem = () =>
    setItems([...items, { productId: "", quantity: 1 }]);

  const handleChangeItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] =
      field === "quantity" || field === "productId" ? Number(value) : value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/orders", { userId, items });
      setCreatedOrder(res.data);
      setUserId("");
      setItems([{ productId: "", quantity: 1 }]);
      onOrderCreated(); 
      
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="space-y-4 flex justify-around  mx-auto">
      <form
        onSubmit={handleSubmit}
        className="h-auto space-y-2 p-4 border rounded-lg w-[600px]"
      >
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />

        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Product ID"
              value={item.productId}
              onChange={(e) =>
                handleChangeItem(idx, "productId", e.target.value)
              }
              className="border p-2 rounded flex-1"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              min={1}
              onChange={(e) => handleChangeItem(idx, "quantity", e.target.value)}
              className="border p-2 rounded "
            />
          </div>
        ))}
        <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Add Item
        </button>

        <button
          type="submit"
          className="bg-gray-500  text-white px-4 py-2 rounded ml-2 hover:bg-gray-600"
        >
          Create Order
        </button>
        </div>
      </form>

    </div>
  );
}
