import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Types.ObjectId,
      ref: "Car",
    },
    time: {
      type: String,
    },
    emptySpots: [
      {
        type: Number,
      },
    ],
    takenSlot: {
      type: String,
    },
    isEntering: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Log", logSchema);
