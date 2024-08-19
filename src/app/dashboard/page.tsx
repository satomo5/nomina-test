"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /dashboard/order
    router.replace("/dashboard/order");
  }, [router]);

  return null;
}
