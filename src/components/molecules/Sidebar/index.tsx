"use client";

import Link from "next/link";
import "./style.scss";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDashboardContext } from "@/context/dashboard";
import Iconify from "@/components/atoms/Iconify";

const MENU_SIDEBAR = [
  {
    label: "Order",
    url: "/dashboard/order",
  },
  {
    label: "Product",
    url: "/dashboard/product",
  },
  {
    label: "User",
    url: "/dashboard/user",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { openSidebar } = useDashboardContext();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("users");
    router.replace("/");
  };

  return (
    <div>
      <div className={`sidebar ${openSidebar ? "open" : ""}`}>
        <div>
          <h2>Dashboard</h2>
          <ul>
            {MENU_SIDEBAR.map((item, index) => (
              <li key={`sidebar-${index}`}>
                <Link
                  className={pathname.includes(item.url) ? "selected" : ""}
                  href={item.url}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button className="logout-action" onClick={handleLogout}>
          <Iconify icon="material-symbols:logout" />
          Logout
        </button>
      </div>
    </div>
  );
}
