import React from "react";
import { useRouter } from "next/router";
import Navbar from "../ui/Navbar";

export default function Layout({ children }) {
  const router = useRouter();

  if (
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/profile"
  ) {
    return <div className="min-h-screen w-full flex flex-col">{children}</div>;
  } else {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        {children}
      </div>
    );
  }
}
