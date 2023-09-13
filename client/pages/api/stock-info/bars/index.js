export default async function handler(req, res) {
  const { symbol, resolution, from, to } = req.body;
  console.log(symbol, resolution, from, to);

  try {
    const metric = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.FINNHUB_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));
    res.status(200).json(metric);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
