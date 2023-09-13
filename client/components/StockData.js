import React, { useState, useEffect, useMemo } from "react";
import { Select, SelectItem } from "@tremor/react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/FChart"), { ssr: false });

export default function StockData() {
  const [value, setValue] = useState("");
  const [barData, setBarData] = useState([]);

  const router = useRouter();
  const { symbol } = router.query;

  function convertData(inputData) {
    const transformedData = [];

    for (let i = 0; i < inputData.c.length; i++) {
      const candle = {
        close: inputData.c[i].toString(),
        high: inputData.h[i].toString(),
        open: inputData.o[i].toString(),
        low: inputData.l[i].toString(),
        date: new Date(inputData.t[i] * 1000).toLocaleString(), // Convert timestamp to a readable date format
      };

      // Push the transformed candle data into the candles array
      transformedData.push(candle);
    }
    console.log(transformedData);

    return transformedData;
  }

  useEffect(() => {
    if (value) {
      // from and to are the unix timestamps
      const from = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 7;
      const to = Math.floor(Date.now() / 1000);

      console.log("from", from);
      console.log("to", to);

      getStockData(symbol, value, from, to).then((data) => {
        console.log(data);
        const transformedData = convertData(data);
        setBarData(transformedData);
      });
    }
  }, [value]);

  const chart = useMemo(() => {
    if (value) {
      return <Chart barData={barData}></Chart>;
    }
  }, [value]);

  return (
    <div>
      <Select className="w-1/3" value={value} onValueChange={setValue}>
        {
          // add timeframes to the dropdown menu
        }
        <SelectItem key="1" value="1">
          1
        </SelectItem>
        <SelectItem key="5" value="5">
          5
        </SelectItem>
        <SelectItem key="15" value="15">
          15
        </SelectItem>
        <SelectItem key="30" value="30">
          30
        </SelectItem>
        <SelectItem key="60" value="60">
          60
        </SelectItem>
        <SelectItem key="D" value="D">
          D
        </SelectItem>
        <SelectItem key="W" value="W">
          W
        </SelectItem>
        <SelectItem key="M" value="M">
          M
        </SelectItem>
      </Select>
      {chart}
    </div>
  );
}

async function getStockData(symbol, resolution, from, to) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      symbol: symbol,
      resolution: resolution,
      from: from,
      to: to,
    }),
  };

  const data = await fetch(
    // fetch from api endpoint with symbol as a parameter /api/stock-info/price
    // and pass in the options object
    `http://localhost:3000/api/stock-info/bars`,
    options
  );

  const stockData = await data.json();

  return stockData;
}
