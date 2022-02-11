import express from "express";
import database from "./Database/database";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
database();

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
