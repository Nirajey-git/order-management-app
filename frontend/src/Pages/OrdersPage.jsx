import { useState } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";

export default function OrdersPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Orders</h1>
     
      <OrderForm onOrderCreated={() => setRefresh((prev) => prev + 1)} />
      <OrderList refresh={refresh} />
      
    </div>
  );
}
