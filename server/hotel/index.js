import express from "express";
import {
  getFoodServiceOutlets,
  getFoodServicePostings,
  getMarketSegments,
} from "../../database/queries.js";
const router = express.Router();

router.get("/foodservice-outlets", (req, res) => {
  console.log("F&B Outlets requested");
  console.log(req.query);
  getFoodServiceOutlets()
    .then(data => data.map(({ subgroup: code, name: label }) => ({ label, code })))
    .then(data => res.send({ ok: true, data }))
    .catch(error => res.send({ ok: false, error }));
});

router.get("/foodservice-postings", (req, res) => {
  console.log("F&B Postings requested");
  console.log(req.query);
  getFoodServicePostings()
    .then(data => data.map(({ fbgroup: code, name: label }) => ({ code, label })))
    .then(data => res.send({ ok: true, data }))
    .catch(error => res.send({ ok: false, error }));
});

router.get("/market-segments", (req, res) => {
  console.log("Market Segments requested");
  console.log(req.query);
  getMarketSegments()
    .then(data => data.map(({ code, description: label }) => ({ code, label })))
    .then(data => res.send({ ok: true, data }))
    .catch(error => res.send({ ok: false, error }));
});

export default router;
