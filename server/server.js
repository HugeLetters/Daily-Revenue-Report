import express from "express";
import dotenv from "dotenv";
import ViteExpress from "vite-express";
import { readdir } from "fs/promises";
import multer from "multer";
import inputRouter from "./input/index.js";
import hotelRouter from "./hotel/index.js";

dotenv.config();
const app = express();
export default app;
const multerParser = multer();
const { SERVER_PORT: PORT } = process.env;

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// TODO Remove this later - makes my server available only on localhost
app.use((req, __, n) => {
  /localhost/.test(req.get("host")) && n();
});

app.use("/api/input", multerParser.none(), inputRouter);
app.use("/api/hotel", hotelRouter);

app.get("/logo", (req, res) => {
  readdir("./server/assets/logo")
    .then(x => {
      res.send(x);
    })
    .catch(e => {
      console.error(e);
      res.send("Coudn't retrieve data");
    });
});
app.use("/logo", express.static("server/assets/logo"));
