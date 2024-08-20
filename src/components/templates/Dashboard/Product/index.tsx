"use client";

import { UserProvider } from "@/context/user";
import "./style.scss";
import ProductAdd from "./Add";
import { useParams } from "next/navigation";
import ProductList from "./List";
import ProductDetail from "./Detail";

export default function ProductPage() {
  const params = useParams();
  const slug1 = params.slug[1] || "default";
  const slug2 = params.slug[2];

  let renderChild = <></>;

  switch (slug1) {
    case "default":
      renderChild = <ProductList />;
      break;

    case "add":
      renderChild = <ProductAdd />;
      break;

    case "edit":
      renderChild = <ProductAdd id={slug2} />;
      break;

    default:
      renderChild = <ProductDetail slug={slug1} />;
      break;
  }

  return <UserProvider>{renderChild}</UserProvider>;
}
