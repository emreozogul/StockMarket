import React from "react";
import { Card, Subtitle, BarChart } from "@tremor/react";

export default function RecomContainer({ recommendationsData }) {
  return (
    <Card className="w-2/3">
      <Subtitle className="text-2xl font-bold mt-4">
        {"Recommendations Trends"}
      </Subtitle>
      <BarChart
        index="period"
        data={recommendationsData}
        categories={["strongBuy", "buy", "hold", "sell", "strongSell"]}
        className="mt-4"
        colors={["emerald", "green", "yellow", "red", "rose"]}
      />
    </Card>
  );
}
