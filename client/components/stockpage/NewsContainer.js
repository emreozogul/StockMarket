import React, { useMemo, useState } from "react";
import { Card, Divider } from "@tremor/react";

export default function NewsContainer({ newsData, symbol }) {
  const [paginatedData, setPaginatedData] = useState(newsData.news.slice(0, 5));
  const [active, setActive] = useState(1);

  const pagination = useMemo(() => {
    if (newsData.news.length > 5) {
      return (
        <div className=" flex flex-row justify-center items-center">
          {Array.from(Array(Math.ceil(newsData.news.length / 5)).keys()).map(
            (number) => {
              return (
                <div
                  key={number}
                  className={
                    " px-2 py-1 cursor-pointer hover:bg-gray-100" +
                    (active === number + 1
                      ? " bg-gray-100 border-b border-gray-400"
                      : "")
                  }
                  onClick={() => {
                    setPaginatedData(
                      newsData.news.slice(number * 5, number * 5 + 5)
                    );
                    setActive(number + 1);
                  }}
                >
                  <p className="text-sm font-bold">{number + 1}</p>
                </div>
              );
            }
          )}
        </div>
      );
    }
  }, [newsData.news, active]);

  return (
    <Card className=" w-2/3 h-full mt-4 flex justify-center items-center ">
      <div className="w-full h-full flex flex-col items-center overflow-y-auto px-4">
        <div className="text-2xl font-bold flex w-full justify-between items-center">
          <p className="text-2xl font-bold">Recent News</p>
          {pagination}
        </div>
        <Divider />
        <ul className="w-full h-full flex flex-col items-center overflow-y-auto px-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((news) => {
              return (
                <li
                  className="w-full flex flex-row  items-center border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  key={news.id}
                  onClick={() => {
                    // open on new tab
                    window.open(news.url, "_blank");
                  }}
                >
                  <div className="flex flex-col p-2 w-full">
                    <div className=" flex w-full justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-sm font-bold border-b ">
                          {news?.author}
                        </p>
                        <div className="text-sm"></div>
                      </div>
                      {news?.images &&
                        news.images.map((image) => {
                          if (image.size === "thumb") {
                            return (
                              <img
                                key={image.url}
                                className="w-12 h-12 rounded-full"
                                src={image.url}
                                alt="news"
                              />
                            );
                          }
                        })}
                    </div>
                    <br />
                    <p className="text-md font-bold">{news?.headline}</p>
                    <br />
                    {news.symbols && (
                      <div className="flex flex-row gap-2">
                        <div className="bg-green-400 h-6 text-white rounded-md px-2">
                          {symbol}
                        </div>
                        {news.symbols.slice(0, 12).map((s) => {
                          if (s !== symbol) {
                            return (
                              <div
                                key={s}
                                className="bg-gray-400 h-6 text-white rounded-md px-2 hover:bg-blue-500 cursor-pointer "
                                onClick={() => {
                                  const symbolLowerCase = s.toLowerCase();
                                  window.location.href = `/stock/${symbolLowerCase}`;
                                }}
                              >
                                {s}
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="text-sm font-bold">No news found</div>
          )}
        </ul>
      </div>
    </Card>
  );
}
