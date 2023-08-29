import axios from "axios";

export default async function handler(req, res) {
  const { symbol } = req.body;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "APCA-API-KEY-ID": "PKLHNFS9152B4S9MGSVM",
        "APCA-API-SECRET-KEY": "UwnmFfOtisUQwZnIADyGQDNj4pLAywvZUEkDgjo0",
      },
    };

    const news = await fetch(
      `https://data.alpaca.markets/v1beta1/news?sort=desc&symbols=${symbol}&limit=20`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
