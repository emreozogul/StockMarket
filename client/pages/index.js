import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import StockData from "../components/StockData";
import { TextInput, Card } from "@tremor/react";

export default function Home() {
  return (
    <>
      <section className="w-full h-screen  pt-24 pb-4"></section>

      <section className="w-full h-screen py-4">
        <main className=" w-full h-full flex flex-col items-center ">
          <Card
            className="w-1/2 h-full bg-white rounded-md"
            decoration="top"
            decorationColor="green"
          >
            <div className="flex flex-row justify-between items-center w-full gap-2 border border-gray-300 pr-2 rounded-lg   ">
              <TextInput
                className="w-full h-10 bg-white rounded-md "
                placeholder="Search for a stock"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 cursor-pointer active:text-gray-800 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </Card>
        </main>
      </section>
    </>
  );
}
