import React, { useMemo } from "react";
import { Card, Text, Metric, LineChart } from "@tremor/react";

export default function StockData({ stockData, className }) {
  const mockData = [
    {
      date: new Date("2021-01-01"),
      open: 100,
      high: 200,
      low: 50,
      close: 150,
      volume: 1000000,
      price: 150,
    },
    {
      date: new Date("2021-01-02"),
      open: 150,
      high: 250,
      low: 100,
      close: 200,
      volume: 2000000,
      price: 200,
    },
    {
      date: new Date("2021-01-03"),
      open: 200,
      high: 300,
      low: 150,
      close: 250,
      volume: 3000000,
      price: 250,
    },
    {
      date: new Date("2021-01-04"),
      open: 250,
      high: 350,
      low: 200,
      close: 300,
      volume: 4000000,
      price: 300,
    },
    {
      date: new Date("2021-01-05"),
      open: 300,
      high: 400,
      low: 250,
      close: 350,
      volume: 5000000,
      price: -350,
    },
  ];

  const data = useMemo(() => {
    if (!stockData) return [];
    return data.map((d) => ({
      date: new Date(d.date),
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume,
    }));
  }, [stockData]);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => value.toLocaleDateString(),
      },
      {
        Header: "Open",
        accessor: "open",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "High",
        accessor: "high",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Low",
        accessor: "low",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Close",
        accessor: "close",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Volume",
        accessor: "volume",
        Cell: ({ value }) => value.toLocaleString(),
      },
    ],
    []
  );

  const metrics = useMemo(
    () => [
      {
        Header: "Open",
        accessor: "open",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "High",
        accessor: "high",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Low",
        accessor: "low",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Close",
        accessor: "close",

        Cell: ({ value }) => value.toFixed(2),
      },

      {
        Header: "Volume",
        accessor: "volume",
        Cell: ({ value }) => value.toLocaleString(),
      },
    ],
    []
  );

  const lineChart = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => value.toLocaleDateString(),
      },
      {
        Header: "Open",
        accessor: "open",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "High",
        accessor: "high",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Low",
        accessor: "low",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Close",
        accessor: "close",
        Cell: ({ value }) => value.toFixed(2),
      },
      {
        Header: "Volume",
        accessor: "volume",
        Cell: ({ value }) => value.toLocaleString(),
      },
    ],
    []
  );

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <Card className={className}>
      <LineChart
        data={mockData}
        index="price"
        categories={["date", "price"]}
        colors={["emerald", "amber"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}
