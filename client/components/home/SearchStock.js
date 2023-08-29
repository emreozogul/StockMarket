import React, { useState, useEffect } from "react";
import { TextInput, Badge } from "@tremor/react";
import axios from "axios";

export default function SearchStock() {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedResults, setSearchedResults] = useState({});
  const [allStocks, setAllStocks] = useState([]);

  useEffect(() => {
    if (searchedValue.trim() !== "") {
      // Filter the stocks based on the searched value , store 50 results in the state
      const results = allStocks
        .filter((stock) =>
          stock.symbol.toLowerCase().includes(searchedValue.toLowerCase())
        )
        .slice(0, 50);

      setSearchedResults(results);
    } else {
      setSearchedResults([]);
    }
  }, [searchedValue]);

  useEffect(() => {
    async function getStocks() {
      const response = await axios.get("/api/assets");
      setAllStocks(response.data);
    }

    getStocks();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <input
        className="w-1/2 h-12 rounded-lg p-4 mt-4 focus:outline-none focus:ring-2 focus:ring-tremor-primary"
        type="text"
        placeholder="Search for a stock"
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
      ></input>

      {searchedResults.length > 0 && (
        <div className="w-1/2 h-72 absolute z-10 mt-20  px-2 flex flex-col gap-4 shadow-md overflow-y-scroll bg-blue-100 rounded-lg p-4 mt-4 cursor-pointer ">
          {searchedResults.map((stock) => (
            <div
              key={stock.symbol}
              className="w-full border p-2 rounded-xl flex flex-row items-center justify-between "
              onClick={() => {
                setSearchedValue("");
                setSearchedResults([]);
                const stockSymbol = stock.symbol.toLowerCase();
                window.location.href = `/stock/${stockSymbol}`;
              }}
            >
              <div className="flex flex-row items-center">
                <div className="w-full rounded-full bg-tremor-primary mr-4">
                  <Badge className="mr-4">{stock.symbol}</Badge>
                  <br></br>
                  <p className="text-black text-md font-semibold">
                    {stock.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center">
                {stock.status === "active" ? (
                  <Badge className="mr-4" color="emerald">
                    Active
                  </Badge>
                ) : (
                  <Badge className="mr-4" color="red">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
