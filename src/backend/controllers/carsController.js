import Car from "../models/Car.js";

// create new car
export const createCar = async (req, res) => {
  const newCar = new Car(req.body);

  try {
    const savedCar = await newCar.save();
    console.log(savedCar);
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedCar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCar = async (req, res) => {
  const id = req.params.id;
  try {
    await Car.findByIdAndDelete(id);

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

//get all car
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      success: true,
      message: "successful",
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
