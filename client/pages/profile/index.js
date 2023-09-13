import React, { useState, useMemo } from "react";
import { Card, Subtitle, Button } from "@tremor/react";
export default function Profile({ assetsData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <main className="flex flex-col items-center min-h-screen justify-screen w-full">
      <button
        className=" absolute top-4 left-4 bg-blue-400 rounded-lg text-sm font-bold text-slate-100 hover:bg-blue-300 px-4 py-1 active:transform active:translate-y-0.5 "
        onClick={() => (window.location.href = "/")}
      >
        <p>Home</p>
      </button>
      <section className="flex flex-col w-full items-center justify-center gap-4 mt-4">
        <Card className="w-1/2">
          <div className="flex flex-row w-full justify-between items-center">
            <Subtitle>Portfolio</Subtitle>
            <button
              className="w-24 h-8 bg-blue-400 rounded-lg text-sm font-bold text-slate-100 hover:bg-blue-300 flex flex-row items-center justify-center gap-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p>Add</p>

              <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                ></path>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </Card>
      </section>
    </main>
  );
}
