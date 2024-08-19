"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DashboardContextType {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user") as { token: string } | null;
    
    if (!user) {
      router.replace("/");
    }
  }, []);

  return (
    <DashboardContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within an DashboardProvider"
    );
  }
  return context;
}
