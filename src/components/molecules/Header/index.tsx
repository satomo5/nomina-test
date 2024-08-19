"use client";

import Image from "next/image";
import "./style.scss";
import Iconify from "@/components/atoms/Iconify";
import { useDashboardContext } from "@/context/dashboard";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState({ username: "", image: "" });
  const { openSidebar, setOpenSidebar } = useDashboardContext();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const { username, image } = JSON.parse(user || "{}");

    setUser({ username, image });
  }, []);

  return (
    <header className="header">
      <div
        className="menu-sidebar"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <Iconify icon="charm:menu-hamburger" />
      </div>
      <div className="profile">
        <div>
          <p>{user.username}</p>
        </div>
        <Image src={user.image} alt="Profile" width={50} height={50} />
      </div>
    </header>
  );
}
