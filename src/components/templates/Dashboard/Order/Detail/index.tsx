"use client";

import React from "react";
import "./style.scss";
import Button from "@/components/atoms/Button";
import { currencyFormat } from "@/lib/helper";
import Loader from "@/components/atoms/Loader";
import { useUserContext } from "@/context/user";
import { useOrderContext } from "@/context/order";
import Image from "next/image";
import { badgeOrderStatus } from "@/enum";
import Badge from "@/components/atoms/Badge";
import { StatusOrderType } from "@/types/status";

function OrderDetail({ slug }: { slug: string }) {
  const { isLoading } = useUserContext();
  const { getDetailData, setStatus } = useOrderContext();
  const order = getDetailData(Number(slug));

  if (isLoading) return <Loader />;

  if (!order) {
    return (
      <div className="card-wrapper add-order">
        <h2>Order not found</h2>
      </div>
    );
  }

  const changeStatus = (status: StatusOrderType) => {
    setStatus(Number(slug), status);

    window.location.reload();
  };

  const status = badgeOrderStatus(order.status);

  return (
    <>
      <div className="card-wrapper detail">
        <div className="header-section">
          <h2>Detail Order</h2>
          <Button variant="secondary" href="/dashboard/order">
            Back
          </Button>
        </div>
        <div className="detail-layout-control">
          <div className="detail-layout">
            <div>
              <p className="title-section">Order</p>
              <div className="detail-wrapper">
                <p>Order ID:</p>
                <p>
                  <b>#{order.id}</b>
                </p>
              </div>

              <div className="detail-wrapper">
                <p>Total:</p>
                <p>
                  <b>{currencyFormat(order.total)}</b>
                </p>
              </div>
              <div className="detail-wrapper">
                <p>Status:</p>
                <Badge variant={status.variant}>{status.text}</Badge>
              </div>
            </div>
          </div>
          <div className="detail-layout">
            <div>
              <Image
                src={order.customer?.image || ""}
                width={100}
                height={100}
                alt={`avatar ${order.customer?.username}`}
              />
            </div>
            <div>
              <p className="title-section">Customer</p>
              <div className="detail-wrapper">
                <p>Name:</p>
                <p>
                  <b>{order.customer?.username}</b>
                </p>
              </div>
              <div className="detail-wrapper">
                <p>Role:</p>
                <p>
                  <b>{order.customer?.role}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-layout">
          <div style={{ flex: 1 }}>
            <p className="title-section">List Product</p>
            <div className="product-list">
              {order.products?.map((product) => (
                <div key={product.id} className="detail-layout">
                  <div>
                    <div className="detail-wrapper">
                      <p>Product:</p>
                      <p>
                        <b>{product.name}</b>
                      </p>
                    </div>
                    <div className="detail-wrapper">
                      <p>Quantity:</p>
                      <p>
                        <b>{product.quantity}</b>
                      </p>
                    </div>
                    <div className="detail-wrapper">
                      <p>Product:</p>
                      <p>
                        <b>{currencyFormat(product.price)}</b>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="btn-action">
          {order.status === "pending" ? (
            <Button variant="warning" onClick={() => changeStatus("delivered")}>
              Set to Delivered
            </Button>
          ) : order.status === "delivered" ? (
            <Button variant="warning" onClick={() => changeStatus("shipped")}>
              Set to Shipped
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
