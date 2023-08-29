import React, { useState } from "react";

export default function NewsContainer({ newsData }) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <ul className="w-full h-full flex flex-col items-center overflow-y-auto px-4">
      {newsData.length > 0 ? (
        newsData.map((news) => {
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
                    <p className="text-sm">
                      {new Date(news?.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                  {news?.images &&
                    news.images.map((image) => {
                      if (image.size === "thumb") {
                        return (
                          <img
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
                    {news.symbols.slice(0, 15).map((symbol) => (
                      <div className="text-sm font-bold px-2  rounded-lg bg-slate-200">
                        {symbol}
                      </div>
                    ))}
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
  );
}
