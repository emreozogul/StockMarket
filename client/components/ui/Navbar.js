import React from "react";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  return (
    <div className="absolute flex w-full bg-blue-300 h-20 justify-between items-center px-10 shadow-md">
      <div className="flex items-center">
        <div className="text-3xl font-bold">LOGO</div>
      </div>
      <div className="flex items-center">
        <NavbarDropdown />
      </div>
    </div>
  );
}
