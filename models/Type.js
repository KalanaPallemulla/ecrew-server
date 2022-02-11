import mongoose from "mongoose";

const schema = mongoose.Schema;

const typeSchema = new schema({
  sType: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Type", typeSchema);
