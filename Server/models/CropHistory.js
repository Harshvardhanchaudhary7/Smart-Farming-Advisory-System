import mongoose from "mongoose";

const cropHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    crop: {
      type: String,
      required: true,
    },

    soil: {
      type: String,
      required: true,
    },

    season: {
      type: String,
      required: true,
    },

    farmSize: {
      type: Number,
      required: true,
    },

    temperature: Number,

    rainfall: Number,

    humidity: Number,

    aiSummary: {
      type: String,
      required: true,
    },

    aiActions: {
      type: [String],
      default: [],
    },

    weatherCondition: String,

    location: String,

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "CropHistory",
  cropHistorySchema
);