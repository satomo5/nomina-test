"use client";

import { OrderType } from "@/types/order";
import { StatusOrderType } from "@/types/status";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OrderContextType {
  orders: OrderType[];
  updateOrderStatus: (id: number, status: OrderType["status"]) => void;
  filterOrders: (status: OrderType["status"] | "all") => OrderType[];
  addData: (data: OrderType) => void;
  editData: (id: number, data: OrderType) => void;
  getDetailData: (id: number) => OrderType | undefined;
  setStatus: (id: number, status: StatusOrderType) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const dataStorage = localStorage.getItem("orders");

    if (dataStorage) {
      setOrders(JSON.parse(dataStorage));
    }
  }, []);

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

  const setStatus = (id: number, status: StatusOrderType) => {
    const newData = orders.map((item) => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    });

    setOrders(newData);
    localStorage.setItem("orders", JSON.stringify(newData));
  };

  const getDetailData = (id: number) => {
    return orders.find((item) => item.id === id);
  };

  const addData = (props: OrderType) => {
    const newData = [props, ...orders];

    setOrders(newData);
    localStorage.setItem("orders", JSON.stringify(newData));
  };

  const editData = (id: number, props: OrderType) => {
    const newData = orders.map((item) => {
      if (item.id === id) {
        return props;
      }
      return item;
    });

    setOrders(newData);
    localStorage.setItem("orders", JSON.stringify(newData));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addData,
        editData,
        updateOrderStatus,
        setStatus,
        getDetailData,
        filterOrders,
      }}
    >
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
