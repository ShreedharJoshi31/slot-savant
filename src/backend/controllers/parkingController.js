import Parking from "../models/Parking.js";

// create new parking
export const createParking = async (req, res) => {
  const newParking = new Parking(req.body);

  try {
    const savedParking = await newParking.save();
    console.log(savedParking);
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedParking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteParking = async (req, res) => {
  const id = req.params.id;
  try {
    await Parking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

//get all parking
export const getAllParkings = async (req, res) => {
  try {
    const parking = await Parking.find().populate("car");

    res.status(200).json({
      success: true,
      message: "successful",
      data: parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
