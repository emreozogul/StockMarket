// pages/stock/[symbol].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Divider } from "@tremor/react";
import StockData from "@/components/StockData";
import axios from "axios";
import NewsContainer from "@/components/home/NewsContainer";

const StockPage = () => {
  const [realTimeData, setRealTimeData] = useState({});
  const [newsData, setNewsData] = useState([]);
  const router = useRouter();
  const { symbol } = router.query;
  // Convert symbol to uppercase
  const symbolUpperCase = symbol && symbol.toUpperCase();

  useEffect(() => {
    async function getRealTimeData() {
      const params = {
        symbol: symbolUpperCase,
      };

      const response = await axios.post("/api/stock-info/news", params);
      const news = response.data.news;
      setNewsData(news);
    }

    getRealTimeData();
  }, [symbolUpperCase]);

  return (
    <>
      <section className=" w-full  min-h-screen flex flex-col py-4 ">
        <div className=" w-full flex flex-col justify-center items-center ">
          <StockData className="w-full h-1/2  mt-4 flex justify-center items-center " />
          <Card className=" w-2/3 h-full pb-10 justify-between items-center flex flex-col">
            <Card className="flex flex-col w-full  h-1/2 rounded-md">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">
                  {"#"}
                  {symbolUpperCase}
                </div>
                <div className="text-sm font-bold">{"+%15"}</div>
              </div>
              <Divider />
              <div className="flex flex-row justify-center items-center w-full h-full">
                <div className="w-1/2 h-full  items-start justify-start flex flex-col ">
                  <div className="  text-sm  font-bold">
                    Price: $
                    {realTimeData.price && realTimeData.price.toFixed(2)}
                  </div>
                  <div className=" text-sm font-bold">
                    Change: $
                    {realTimeData.change && realTimeData.change.toFixed(2)}
                  </div>

                  <div className="text-sm font-bold">
                    Volume:{" "}
                    {realTimeData.volume &&
                      realTimeData.volume.toLocaleString("en-US")}
                  </div>
                  <div className="text-sm font-bold">
                    Market Cap:{" "}
                    {realTimeData.marketCap &&
                      realTimeData.marketCap.toLocaleString("en-US")}
                  </div>
                </div>
                <div className="w-1/2 h-full justify-start items-center flex flex-col "></div>
              </div>
            </Card>
          </Card>
          <Card className=" w-2/3 h-full mt-4 flex justify-center items-center ">
            <div className="w-full h-full flex flex-col items-center overflow-y-auto px-4">
              <div className="text-2xl font-bold flex w-full justify-start items-center">
                Recent News
              </div>
              <Divider />
              <NewsContainer newsData={newsData} />
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default StockPage;
