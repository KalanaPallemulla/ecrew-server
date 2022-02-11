import express from "express";
import Type from "../models/Type";

const router = express.Router();

router.get("/type", async (req, res) => {
  let type = await Type.find().exec();
  return res.json(type);
});

router.post("/type", async (req, res) => {
  let data = req.body;

  let type = new Type(data);

  await type.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.json(result);
  });
});

module.exports = router;
