import mongoose from "mongoose";

const schema = mongoose.Schema;

const locationSchema = new schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
});

export default mongoose.model("Location", locationSchema);
