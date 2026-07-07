import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },

    action: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "rain",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Alert", alertSchema);