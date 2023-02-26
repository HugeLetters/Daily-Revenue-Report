import express from "express";
const router = express.Router();

router.put("/financial", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(Object.keys(data).length);
  console.log(req.query);
  res.status(200).send("Financial PUT request received!");
});

router.put("/day", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(Object.keys(data).length);
  console.log(req.query);
  res.status(200).send("Daily PUT request received!");
});

router.put("/rolling", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(Object.keys(data).length);
  console.log(req.query);
  res.status(200).send("Rolling Forecast PUT request received!");
});

export default router;
