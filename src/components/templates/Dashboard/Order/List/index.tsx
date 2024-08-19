"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./style.scss";
import { StatusOrderType } from "@/types/status";
import Button from "@/components/atoms/Button";
import { useOrderContext } from "@/context/order";
import { statusOrderFilter } from "@/const/filter";

function OrderList() {
  const { filterOrders } = useOrderContext();
  const [statusFilter, setStatusFilter] = useState<StatusOrderType | "all">(
    "all"
  );

  return (
    <div className="card-wrapper order-list">
      <div className="wrapper">
        <h2>Order Management</h2>
        <Button variant="success" href="/dashboard/order/add">
          Add
        </Button>
      </div>
      <div className="filter">
        <label>Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as any);
          }}
        >
          {[{ value: "all", text: "All" }, ...statusOrderFilter].map(
            (option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            )
          )}
        </select>
      </div>
      <div className="list-wrapper">
        {filterOrders(statusFilter).map((order) => (
          <Link
            key={order.id}
            href={`/dashboard/order/${order.id}`}
            className="order-card"
          >
            <h3>Order #{order.id}</h3>
            <p>Customer: {order.customerName}</p>
            <p>Status: {order.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
