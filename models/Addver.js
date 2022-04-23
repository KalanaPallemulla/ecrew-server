import mongoose from "mongoose";

const schema = mongoose.Schema;

const addSchema = new schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("Addver", addSchema);
