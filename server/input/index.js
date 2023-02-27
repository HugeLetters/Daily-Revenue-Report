import express from "express";
import { dateSchema } from "../validation/schema.js";
import dailyRouter from "./day.js";
const router = express.Router();

router.use((req, res, next) => {
  const { data: date, success } = dateSchema.safeParse(req.query.date);
  if (!success) return res.sendStatus(400);
  req.body.date = date;
  next();
});

router.use("/day", dailyRouter);

router.put("/financial", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("Financial PUT request received!");
});

router.put("/rolling", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("Rolling Forecast PUT request received!");
});

export default router;
