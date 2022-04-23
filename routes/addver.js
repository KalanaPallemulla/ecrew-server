import express from "express";
import formidable from "express-formidable";
import Addver from "../models/Addver";
import fs from "fs";

const router = express.Router();

router.post("/add/:id", formidable(), async (req, res) => {
  const files = req.files;
  console.log(files);

  if (req.params.id) {
    let add = await Addver.findById(req.params.id);

    if (add) {
      await Addver.findByIdAndUpdate(req.params.id, files, {
        new: true,
      }).exec();
      res.send({ msg: "updated" });
    }
  } else {
    let add = new Addver();

    if (files.image) {
      add.image.data = fs.readFileSync(files.image.path);
      add.image.contentType = files.image.type;
    }

    add.save((err, result) => {
      if (err) {
        console.log("Image Add =>", err);
        res.status(400).json(err);
      }
      res.send(result);
    });
  }
});

module.exports = router;
