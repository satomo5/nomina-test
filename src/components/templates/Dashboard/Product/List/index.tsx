"use client";

import React from "react";
import Link from "next/link";
import "./style.scss";
import Button from "@/components/atoms/Button";
import { useProducContext } from "@/context/product";
import Empty from "@/components/atoms/Empty";
import { currencyFormat } from "@/lib/helper";

function ProductList() {
  const { data } = useProducContext();

  return (
    <div className="card-wrapper data-list">
      <div className="wrapper">
        <h2>Product Management</h2>
        <Button variant="success" href="/dashboard/product/add">
          Add
        </Button>
      </div>
      {data?.length > 0 ? (
        <div className="list-wrapper">
          {data?.map((item, index) => (
            <Link
              key={item.id}
              href={`/dashboard/product/${item.id}`}
              className="user-card"
            >
              <div className="layout">
                <p className="username">{item.name}</p>
                <p className="role">{item.quantity}</p>
                <p className="role">{currencyFormat(item.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default ProductList;
