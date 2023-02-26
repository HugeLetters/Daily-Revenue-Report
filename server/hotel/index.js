import express from "express";
import {
  getFoodserviceOutlets,
  getFoodservicePostings,
  getHotelConfig,
  getMarketSegments,
} from "../../database/queries.js";
const router = express.Router();

router.get("/foodservice-outlets", (req, res) => {
  console.log("F&B Outlets requested");
  getFoodserviceOutlets()
    .then(data => data.map(({ subgroup: code, name: label }) => ({ label, code })))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error));
});

router.get("/foodservice-postings", (req, res) => {
  console.log("F&B Postings requested");
  getFoodservicePostings()
    .then(data => data.map(({ fbgroup: code, name: label }) => ({ code, label })))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error));
});

router.get("/market-segments", (req, res) => {
  console.log("Market Segments requested");
  getMarketSegments()
    .then(data => data.map(({ code, description: label }) => ({ code, label })))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error));
});

router.get("/config", (req, res) => {
  const queryMap = new Map([
    ["outlook_months", "Months Outlook Count"],
    ["outlook_days", "Days Outlook Count"],
    ["events_limit", "Events Daily Limit"],
  ]);
  console.log("Hotel config requested");
  getHotelConfig(queryMap.get(req.query.name))
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error));
});
export default router;
