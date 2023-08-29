import { Card, LineChart } from "@tremor/react";
import React, { useContext, useState, useMemo } from "react";

export default function AuthLayout({ children, page }) {
  // check if the page is login or signup

  const isLoginPage = useMemo(() => {
    return page === "login";
  }, [page]);
  // based on the page we will change the background color

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen  ">
      <div className="flex flex-row justify-center items-center w-4/5 h-4/5 rounded-lg shadow-md bg-white">
        <div className="flex flex-col w-full h-full ">
          {isLoginPage ? (
            <div className="flex flex-row justify-center items-center w-full h-full bg-blue-400 rounded-l-lg">
              <h1 className="text-4xl text-white font-bold">Login</h1>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center w-full h-full bg-blue-400 rounded-l-lg">
              <h1 className="text-4xl text-white font-bold">Signup</h1>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full h-full ">{children}</div>
      </div>
    </div>
  );
}
