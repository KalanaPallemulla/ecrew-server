import express from "express";
import SubType from "../models/SubType";

const router = express.Router();

router.get("/subType", async (req, res) => {
  let type = await SubType.find().exec();
  return res.json(type);
});

router.post("/subType", async (req, res) => {
  let data = req.body;

  let type = new SubType(data);

  await type.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json(result);
  });
});

module.exports = router;
