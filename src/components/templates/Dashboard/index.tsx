"use client";

import Sidebar from "@/components/molecules/Sidebar";
import Header from "@/components/molecules/Header";
import "./style.scss";
import { useParams } from "next/navigation";
import OrderPage from "./Order";
import UserPage from "./User";
import { DashboardProvider } from "@/context/dashboard";
import ProductPage from "./Product";
import { ProductProvider } from "@/context/product";
import { UserProvider } from "@/context/user";

export default function DashboardLayout() {
  const params = useParams();
  const slug = params.slug[0];
  const slugLvl2 = params.slug[1];

  let renderChild = <></>;

  switch (slug) {
    case "order":
      renderChild = <OrderPage slug={slugLvl2} />;
      break;

    case "product":
      renderChild = <ProductPage />;
      break;

    case "user":
      renderChild = <UserPage />;
      break;

    default:
      break;
  }

  return (
    <div className="layout">
      <DashboardProvider>
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <UserProvider>
              <ProductProvider>{renderChild}</ProductProvider>
            </UserProvider>
          </div>
        </div>
      </DashboardProvider>
    </div>
  );
}
