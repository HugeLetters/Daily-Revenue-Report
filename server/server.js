import config from "./config.json" assert { type: "json" };
import express from "express";
import ViteExpress from "vite-express";

const app = express();
const { PORT } = config;

ViteExpress.config({
  mode: process.argv[2] == "-dev" ? "development" : "production",
});

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/worldcount", (req, res) => {
  res.send("Gotc11!");
});
