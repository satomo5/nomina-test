"use client";

import { OrderType } from "@/types/order";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OrderContextType {
  orders: OrderType[];
  updateOrderStatus: (id: number, status: OrderType["status"]) => void;
  filterOrders: (status: OrderType["status"] | "all") => OrderType[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<OrderType[]>([
    {
      id: 1,
      customerName: "Alice Johnson",
      status: "pending",
      products: [
        { name: "Product A", quantity: 2, price: 29.99 },
        { name: "Product B", quantity: 1, price: 49.99 },
      ],
      email: "alice@example.com",
    },
    {
      id: 2,
      customerName: "Bob Smith",
      status: "shipped",
      products: [
        { name: "Product C", quantity: 1, price: 19.99 },
        { name: "Product D", quantity: 3, price: 9.99 },
      ],
      email: "bob@example.com",
    },
    // Add more orders as needed
  ]);

  function updateOrderStatus(id: number, status: OrderType["status"]) {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
    // Here you can also add logic to send email notifications
  }

  function filterOrders(status: OrderType["status"] | "all") {
    if (status === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === status);
  }

  useEffect(() => {
    const data = localStorage.getItem("orders") as OrderType[] | null;

    setOrders(data || []);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, filterOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
}
