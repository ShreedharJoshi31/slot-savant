import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
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
    parkedSlots: {
      type: String,
    },
    takenSlot: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Parking", parkingSchema, "parking");
