import React from "react";
import { Card, Divider } from "@tremor/react";

export default function GeneralView({ priceData, quoteData }) {
  return (
    <Card className=" w-2/3 h-full pb-10 justify-between items-center flex flex-col gap-6 -z-10">
      <Card className="flex flex-col w-full  h-1/2 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            {"#"}
            {priceData.symbol}
          </div>
          <div className="text-2xl font-bold">
            {quoteData.d > 0 ? (
              <>
                <span className="text-green-400">{quoteData.d}</span>
                <span className="text-green-400">▲</span>
              </>
            ) : (
              <>
                <span className="text-red-300">{quoteData.d}</span>
                <span className="text-red-300">▼</span>
              </>
            )}
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-3 justify-between items-center">
          <div className="flex flex-col">
            <div className="text-md font-bold">
              <p>52W High: {priceData.metric["52WeekHigh"]}</p>
            </div>
            <div className="text-md font-bold">
              <p>52W Low: {priceData.metric["52WeekLow"]}</p>
            </div>
            <div className="text-md font-bold">
              <p>P/E: {priceData.metric["peTTM"]}</p>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="text-md font-bold">
              <p>Open: {quoteData.o} </p>
            </div>
            <div className="text-md font-bold">
              <p>Close: {quoteData.c} </p>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="text-md font-bold">
              <p>High: {quoteData.h} </p>
            </div>
            <div className="text-md font-bold">
              <p>Low: {quoteData.l} </p>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
}
