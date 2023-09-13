export default async function handler(req, res) {
  const { symbol } = req.body;

  try {
    const quote = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));
    res.status(200).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
