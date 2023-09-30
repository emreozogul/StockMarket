import React, { useState, useMemo } from "react";
import { Card, Subtitle, Button } from "@tremor/react";
import SearchAssetContainer from "@/components/profile/SearchAssetContainer";
export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [assets, setAssets] = useState([]);

  function submitAssets(param) {
    // add param array to assets array
    setAssets([...assets, ...param]);
  }

  return (
    <main className="flex flex-col items-center min-h-screen justify-screen w-full bg-custom-bg">
      <button
        className=" absolute top-4 left-4 bg-blue-400 rounded-lg text-lg font-bold text-slate-100 hover:bg-blue-300 px-4 py-2 active:transform active:translate-y-0.5 flex flex-row gap-1 items-center hover:bg-gradient-to-r hover:from-blue-400 hover:to-red-400 group  hover:transform hover:translate-y-0.5 transition-all duration-300  "
        onClick={() => (window.location.href = "/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

        <p>Home</p>
      </button>
      <section className="flex flex-col w-full items-center justify-center gap-4 mt-4">
        {isOpen && (
          <SearchAssetContainer
            submitAssets={submitAssets}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></SearchAssetContainer>
        )}
        <Card className="w-1/2 flex flex-col">
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
          <div className="flex flex-col w-full gap-4 mt-4">
            {assets.map((asset) => (
              <div className="flex flex-row w-full justify-between items-center">
                {asset.description}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
