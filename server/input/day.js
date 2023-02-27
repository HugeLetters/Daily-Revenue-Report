import express from "express";
import { parseDayliFoodserviceInput } from "../validation/parsers/day/foodservice.js";
import { parseDayliPostingsInput } from "../validation/parsers/day/postings.js";
import { parseDayliRoomsInput } from "../validation/parsers/day/rooms.js";
import { dailyInputSchema } from "../validation/schema.js";
const router = express.Router();

router.put("/:category", (req, res) => {
  console.log(req.body);
  const parser = parsers[req.params.category];
  if (!parser) return res.sendStatus(404);

  const data = parser(req.body);
  console.log(data);
  console.log(dailyInputSchema.safeParse(data));
  res.send("Daily PUT request received!");
});

const parsers = {
  rooms: parseDayliRoomsInput,
  foodservice: parseDayliFoodserviceInput,
  postings: parseDayliPostingsInput,
};

export default router;
