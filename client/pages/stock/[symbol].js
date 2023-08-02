// pages/stock/[symbol].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Divider, LineChart } from "@tremor/react";
import StockData from "@/components/StockData";

const StockPage = () => {
  const [realTimeData, setRealTimeData] = useState({});
  const router = useRouter();
  const { symbol } = router.query;
  // Convert symbol to uppercase
  const symbolUpperCase = symbol && symbol.toUpperCase();

  useEffect(() => {
    // Connect to WebSocket server on component mount
    const socket = new WebSocket("ws://localhost:5000");

    socket.addEventListener("open", () => {
      // Send stock symbol to server when the WebSocket connection is open
      socket.send(JSON.stringify({ symbol }));
    });

    // Add event listener to handle incoming real-time data
    socket.addEventListener("message", (event) => {
      let newData = {};
      try {
        newData = JSON.parse(event.data);
        console.log("Received message:" + newData);
      } catch (error) {
        console.error("Error parsing server message:", error);
      }

      setRealTimeData(newData); // Update state with new real-time data
    });

    return () => {
      // Close WebSocket connection on component unmount
      socket.close();
    };
  }, [symbol]);

  // Display the stock information, including real-time data
  return (
    <div className=" w-full  min-h-screen flex flex-col pt-24 pb-8">
      <div className=" w-full h-[300px] lg:h-[600px] xl:h-[700px] flex flex-col justify-center items-center ">
        <Card
          className=" w-2/3 h-full pb-10 justify-between items-center flex flex-col"
          decoration="top"
          decorationColor="green"
        >
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
                  Price: ${realTimeData.price && realTimeData.price.toFixed(2)}
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
          <StockData className="w-full h-1/2  mt-4 flex justify-center items-center " />
        </Card>
      </div>
    </div>
  );
};

export default StockPage;
