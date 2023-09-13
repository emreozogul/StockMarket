import StockData from "@/components/StockData";
import { GeneralView, NewsContainer } from "@/components/stockpage";
import FinancialChart from "@/components/stockpage/FinancialChart";
import RecomContainer from "@/components/stockpage/RecomContainer";

export default function StockPage({
  newsData,
  priceData,
  quoteData,
  recommendationsData,
}) {
  return (
    <>
      <section className=" w-full  min-h-screen flex flex-col py-4 ">
        <div className=" w-full flex flex-col justify-center items-center gap-4 ">
          <GeneralView priceData={priceData} quoteData={quoteData} />
          <FinancialChart priceData={priceData} />
          <RecomContainer recommendationsData={recommendationsData} />
          <NewsContainer symbol={priceData.symbol} newsData={newsData} />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { symbol } = params;
  const symbolUpperCase = symbol && symbol.toUpperCase();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ symbol: symbolUpperCase }),
  };

  const news = await fetch(
    // fetch from api endpoint with symbol as a parameter /api/stock-info/news
    // and pass in the options object
    `http://localhost:3000/api/stock-info/news`,
    options
  );

  const quote = await fetch(
    // fetch from api endpoint with symbol as a parameter /api/stock-info/quote
    // and pass in the options object
    `http://localhost:3000/api/stock-info/quote`,
    options
  );

  const recommendations = await fetch(
    // fetch from api endpoint with symbol as a parameter /api/stock-info/recommendations
    // and pass in the options object
    `http://localhost:3000/api/stock-info/recommendations`,
    options
  );

  const price = await fetch(
    // fetch from api endpoint with symbol as a parameter /api/stock-info/price
    // and pass in the options object
    `http://localhost:3000/api/stock-info/price`,
    options
  );

  const newsData = await news.json();
  const priceData = await price.json();
  const quoteData = await quote.json();
  const recommendationsData = await recommendations.json();

  return {
    props: {
      newsData,
      priceData,
      quoteData,
      recommendationsData,
    },
  };
}
