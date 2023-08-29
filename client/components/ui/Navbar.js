import React from "react";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  return (
    <div className="sticky flex w-full bg-gradient-to-b from-custom-primary to-custom-secondary h-20 justify-between bg-[#A076F9] items-center px-10 shadow-md">
      <div className="flex items-center">
        <div className="text-3xl font-bold">LOGO</div>
      </div>
      <div className="flex items-center">
        <NavbarDropdown />
      </div>
    </div>
  );
}
