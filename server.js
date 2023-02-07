import config from "./config.json" assert { type: "json" };
import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
const app = express();

let lastMessage = "";

const { PORT } = config;
ViteExpress.config({
  mode: process.argv[2] == "-dev" ? "development" : "production",
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(bodyParser.json());
app.get("/worldcount", (req, res) => {
  res.send({ text: lastMessage });
});
app.post("/worldcount", (req, res) => {
  lastMessage = req.body.data;
  console.log("Someone clicked!");
  res.send("Counted!");
});
