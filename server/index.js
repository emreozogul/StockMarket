const Alpaca = require("@alpacahq/alpaca-trade-api");
const WebSocket = require("ws");
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

// Start the server
const PORT = 5000; // You can change this port to your desired value
server.listen(PORT, () => {
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

const symbols = [];

const API_KEY = process.env.ALPACA_API_KEY;
const API_SECRET = process.env.ALPACA_API_SECRET_KEY;

class DataStream {
  constructor({ apiKey, secretKey, feed, symbolsString }) {
    this.alpaca = new Alpaca({
      keyId: apiKey,
      secretKey,
      feed,
    });

    const socket = this.alpaca.data_stream_v2;

    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForQuotes([symbolsString]);
      socket.subscribeForTrades([symbolsString]);
      socket.subscribeForBars([symbolsString]);
      socket.subscribeForStatuses([symbolsString]);
    });

    socket.onError((err) => {
      console.log(err);
    });

    socket.onStockTrade((trade) => {
      console.log(trade);
    });

    socket.onStockQuote((quote) => {
      console.log(quote);
    });

    socket.onStockBar((bar) => {
      console.log(bar);
    });

    socket.onStatuses((s) => {
      console.log(s);
    });

    socket.onStateChange((state) => {
      console.log(state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();
  }
}

wss.on("connection", function (ws) {
  console.log("WebSocket client connected!");

  ws.on("message", async function (message) {
    try {
      console.log("Received message:" + message);
      const data = JSON.parse(message);

      if (data.symbol) {
        // Convert the symbol to uppercase
        const symbol = data.symbol.toUpperCase();
        for (let i = 0; i < symbols.length; i++) {
          if (symbols[i] == symbol) {
            return;
          }
        }
        symbols.push(symbol);

        const symbolsString = symbols.join(",");

        // Create a new Alpaca data stream
        const stream = new DataStream({
          apiKey: API_KEY,
          secretKey: API_SECRET,
          feed: "iex",
          paper: false,
          symbolsString,
        });

        // Listen for real-time data
        stream.onStockTrade((trade) => {
          if (trade.symbol == symbol) {
            wss.send(JSON.stringify(trade));
          }
        });

        stream.onStockQuote((quote) => {
          if (quote.symbol == symbol) {
            wss.send(JSON.stringify(quote));
          }
        });

        stream.onStockBar((bar) => {
          if (bar.symbol == symbol) {
            wss.send(JSON.stringify(bar));
          }
        });

        stream.onStatuses((s) => {
          if (s.symbol == symbol) {
            wss.send(JSON.stringify(s));
          }
        });

        stream.onStateChange((state) => {
          if (state.symbol == symbol) {
            wss.send(JSON.stringify(state));
          }
        });

        stream.onDisconnect(() => {
          console.log("Disconnected");
        });

        stream.connect();
      }
    } catch (error) {
      console.error("Errorsss", error);
    }
  });
});
