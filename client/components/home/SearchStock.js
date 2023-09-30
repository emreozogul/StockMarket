import React, { useState, useEffect } from "react";
import { TextInput, Badge } from "@tremor/react";
import axios from "axios";

export default function SearchStock() {
  const [searchedValue, setSearchedValue] = useState("");
  const [allStocks, setAllStocks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function getStocks(searchedValue) {
    try {
      if (searchedValue === "") {
        setAllStocks([]);
        setIsOpen(false);

        return;
      }

      const response = await axios.post("/api/assets", {
        query: searchedValue,
      });
      setAllStocks(response.data.result);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=" w-full h-full flex flex-col items-center gap-4">
      <div className="relative flex flex-row justify-center w-1/2 items-center gap-2 rounded-md hover:border-blue-400">
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none  w-full py-4 px-6  rounded-full bg-slate-50"
          onChange={(e) => {
            setSearchedValue(e.target.value);
          }}
        />
        <div
          className="flex items-center h-12 w-12 flex  justify-center cursor-pointer  text-gray-100 bg-custom-primary rounded-full"
          onClick={() => {
            getStocks(searchedValue);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {allStocks.length > 0 && isOpen && (
          <div className="w-full h-64 absolute z-10  px-2 flex flex-col gap-4 shadow-md overflow-y-scroll bg-custom-bg rounded-md p-4 cursor-pointer ">
            {allStocks.map((stock) => (
              <div
                key={stock.symbol}
                className="w-full border-b p-2 rounded-xl flex flex-row items-center justify-between "
                onClick={() => {
                  setSearchedValue("");
                  const stockSymbol = stock.symbol.toLowerCase();
                  window.location.href = `/stock/${stockSymbol}`;
                }}
              >
                <div className="flex flex-row items-center w-full justify-between">
                  <p className="text-black text-md font-semibold">
                    {stock.description}
                  </p>
                  <Badge className="mr-4">{stock.symbol}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
