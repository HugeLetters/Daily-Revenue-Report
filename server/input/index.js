import express from "express";
const router = express.Router();

router.put("/financial", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(Object.keys(data).length);
  console.log(req.query);
  res.send({ ok: true, data: "Financial PUT request received!" });
});

router.put("/day", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(Object.keys(data).length);
  console.log(req.query);
  res.send({ ok: true, data: "Daily PUT request received!" });
});

router.put("/rolling", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log(Object.keys(data).length);
  console.log(req.query);
  res.send({ ok: true, data: "Rolling Forecast PUT request received!" });
});

export default router;
