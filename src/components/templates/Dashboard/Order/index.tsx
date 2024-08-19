"use client";

import { OrderProvider } from "@/context/order";
import OrderList from "./List";
import OrderAdd from "./Add";

export default function OrderPage({ slug = "default" }: { slug: string }) {
  let renderChild = <></>;

  switch (slug) {
    case "default":
      renderChild = <OrderList />;
      break;

    case "add":
      renderChild = <OrderAdd />;
      break;

    default:
      renderChild = <OrderList />;
      break;
  }

  return <OrderProvider>{renderChild}</OrderProvider>;
}
