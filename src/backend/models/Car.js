import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carNumberPlate: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerDesignation: {
      type: String,
    },
    isParked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
