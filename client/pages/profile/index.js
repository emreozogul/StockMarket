import React from "react";
import { useRouter } from "next/router";
import NavbarDropdown from "@/components/ui/NavbarDropdown";

export default function Profile() {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <div className=" absolute top-10 right-10  ">
        <NavbarDropdown />
      </div>
    </div>
  );
}
