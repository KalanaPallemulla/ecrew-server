import mongoose from "mongoose";

const schema = mongoose.Schema;

const subTypeSchema = new schema({
  subMain: {
    type: String,
    required: true,
  },
  subType: {
    type: String,
    required: true,
    // unique: true,
  },
});

export default mongoose.model("SubType", subTypeSchema);
