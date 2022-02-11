import mongoose from "mongoose";

const Schema = mongoose.Schema;

const salonSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    location: {
      type: String,
      required: "Location is required",
    },
    images: {
      data: Buffer,
      contentType: String,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    wifi: {
      type: Boolean,
      default: false,
    },
    ac: {
      type: Boolean,
      default: false,
    },
    card: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
    },
    description: {
      type: String,
    },
    salonType: { type: String },
    active: {
      type: Number,
      default: 1,
    },
    salonSubType: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Salon", salonSchema);
