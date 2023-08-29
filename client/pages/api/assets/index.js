import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      const response = await axios.get(
        "https://paper-api.alpaca.markets/v2/assets",
        {
          headers: {
            "APCA-API-KEY-ID": process.env.APCA_API_KEY_ID,
            "APCA-API-SECRET-KEY": process.env.APCA_API_SECRET_KEY,
          },
        }
      );

      res.status(response.status).json(response.data);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "An error occurred" });
  }
}
