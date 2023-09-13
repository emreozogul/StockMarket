import {
  Card,
  Subtitle,
  Title,
  LineChart,
  Select,
  SelectItem,
} from "@tremor/react";
import React, { useMemo, useState } from "react";

export default function FinancialChart({ priceData }) {
  const [value, setValue] = useState("");

  const chart = useMemo(() => {
    if (value) {
      const data = priceData.series.quarterly[value].reverse();
      return (
        <LineChart
          index="period"
          data={data}
          categories={["v"]}
          className="mt-4"
          colors={["emerald"]}
        />
      );
    } else {
      return (
        <LineChart
          index="period"
          data={priceData.series.quarterly[
            Object.keys(priceData.series.quarterly)[0]
          ].reverse()}
          categories={["v"]}
          className="mt-4"
          colors={["emerald"]}
        />
      );
    }
  }, [value]);

  const selector = useMemo(() => {
    return (
      <Select className="w-64" onValueChange={setValue}>
        {Object.keys(priceData.series.quarterly).map((key) => {
          return (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          );
        })}
      </Select>
    );
  }, [priceData]);

  return (
    <Card className="w-2/3">
      <div className="flex flex-row items-center w-full justify-between ">
        <Subtitle className="text-2xl font-bold mt-4">{"Financials"}</Subtitle>
        <div className="text-md font-bold">{selector}</div>
      </div>
      {chart}
    </Card>
  );
}
