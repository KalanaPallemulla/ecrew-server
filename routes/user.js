import express from "express";
import User from "../models/User";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/reg", async (req, res) => {
  const { name, password, role } = req.body;

  try {
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  let user = await User.findOne({ name });

  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.jwtSecret,
    { expiresIn: "5 days" },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          role: user.role,
        },
      });
    }
  );

  //   res.json(user);

  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
