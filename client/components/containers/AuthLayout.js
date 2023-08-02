import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen  ">
      <div className="flex flex-row justify-center items-center w-4/5 h-4/5 rounded-lg shadow-md bg-white">
        <div className="flex flex-col w-full h-full ">a</div>
        <div className="flex flex-col w-full h-full ">{children}</div>
      </div>
    </div>
  );
}
