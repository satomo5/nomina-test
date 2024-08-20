"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./style.scss";
import { StatusOrderType } from "@/types/status";
import Button from "@/components/atoms/Button";
import { useOrderContext } from "@/context/order";
import { statusOrderFilter } from "@/const/filter";
import Empty from "@/components/atoms/Empty";
import { currencyFormat } from "@/lib/helper";
import Separator from "@/components/atoms/Separator";
import Badge from "@/components/atoms/Badge";
import { badgeOrderStatus } from "@/enum";

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
      {filterOrders(statusFilter)?.length > 0 ? (
        <div className="list-wrapper">
          {filterOrders(statusFilter).map((order) => {
            const status = badgeOrderStatus(order.status);

            return (
              <Link
                key={order.id}
                href={`/dashboard/order/${order.id}`}
                className="order-card"
              >
                <div className="gap-layout">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>Customer:{order.customer?.username}</p>
                  </div>
                  <span>
                    <Badge variant={status.variant}>{status.text}</Badge>
                  </span>
                </div>
                <Separator margin="10px 0" />
                <div className="gap-layout" style={{ opacity: 0.5 }}>
                  <p>
                    {order.products.length} product
                    {order.products.length > 1 ? "s" : ""}
                  </p>
                  <p>{currencyFormat(order.total)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default OrderList;
