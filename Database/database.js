import mongoose from "mongoose";

const database = async () => {
  await mongoose.connect(process.env.DB, {}, () => {
    console.log("Database running successfully");
  });
};

export default database;
