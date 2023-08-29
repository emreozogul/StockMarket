import React, { useMemo } from "react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/FChart"), { ssr: false });

export default function StockData({ stockData, className }) {
  return (
    <div>
      <Chart></Chart>
    </div>
  );
}
