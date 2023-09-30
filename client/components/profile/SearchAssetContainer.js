import axios from "axios";
import { set } from "mongoose";
import React, { useState } from "react";

export default function SearchAssetContainer({ submitAssets, setIsOpen }) {
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [assets, setAssets] = useState([]);

  const searchHandler = async (e) => {
    e.preventDefault();

    console.log(search);

    const data = await searchAsset(search);
    console.log(data);

    setSearchResults(data.result);
  };

  async function searchAsset(query) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    const res = await fetch("/api/assets", options);

    const data = await res.json();

    return data;
  }

  function submitHandler(assets) {
    submitAssets(assets);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center z-10 gap-4">
      <div className="bg-gradient-to-r  from-gray-200 via-white to-gray-200 p-4 rounded-lg h-2/3 w-1/2 flex flex-col gap-2 ">
        <div className="flex flex-row w-full ">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg p-2 w-full mr-2 outline-none focus:none "
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-custom-green rounded-lg  px-6 text-white  "
            onClick={searchHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4 pr-6 overflow-y-auto ">
          {searchResults.length > 0 ? (
            <div className="flex flex-row items-center w-full">
              <p className="w-32">Symbol</p>

              <p>Description</p>
            </div>
          ) : null}
          {searchResults.length > 0 ? (
            searchResults
              .filter((result) => result.type !== "")
              .map((result) => {
                return (
                  <div className="flex flex-row  items-center w-full">
                    <p className="w-32">{result.symbol}</p>
                    <p className="w-full ">{result.description}</p>
                    <button
                      className="bg-blue-400 rounded-lg   text-white"
                      onClick={() => {
                        setAssets([...assets, result]);
                        setSearchResults([]);
                      }}
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
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })
          ) : (
            <p>No results</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start w-1/2  bg-gradient-to-r  from-gray-200 via-white to-gray-200 rounded-lg p-4 overflow-y-auto h-32 gap-4">
        {assets.map((asset) => {
          return (
            <div className="flex flex-row items-center w-full">
              <p className="w-32">{asset.symbol}</p>
              <p className="w-full">{asset.description}</p>
              <button
                className="bg-blue-400 rounded-md p-2 text-white"
                onClick={() => {
                  setAssets(assets.filter((a) => a.symbol !== asset.symbol));
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row  justify-end items-center w-1/2 gap-2 ">
        <button
          className="bg-blue-400 rounded-md p-1 px-4 text-white"
          onClick={() => {
            setAssets([]);
          }}
        >
          Clear
        </button>
        <button
          className="bg-blue-400 rounded-md p-1 px-4  text-white"
          onClick={() => {
            submitHandler(assets);
            setAssets([]);
            setIsOpen(false);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
