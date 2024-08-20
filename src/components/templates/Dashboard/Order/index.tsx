"use client";

import { OrderProvider } from "@/context/order";
import OrderList from "./List";
import OrderAdd from "./Add";
import OrderDetail from "./Detail";
import { useParams } from "next/navigation";

export default function OrderPage({ slug = "default" }: { slug: string }) {
  const params = useParams();
  const slug2 = params.slug[1];
  let renderChild = <></>;
  

  switch (slug) {
    case "default":
      renderChild = <OrderList />;
      break;

    case "add":
      renderChild = <OrderAdd />;
      break;

    default:
      renderChild = <OrderDetail slug={slug2} />;
      break;
  }

  return <OrderProvider>{renderChild}</OrderProvider>;
}
