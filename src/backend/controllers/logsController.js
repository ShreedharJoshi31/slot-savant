import Logs from "../models/Logs.js";

// create new logs
export const createLog = async (req, res) => {
  const newLogs = new Logs(req.body);

  try {
    const savedLogs = await newLogs.save();
    console.log(savedLogs);
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedLogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteLog = async (req, res) => {
  const id = req.params.id;
  try {
    await Logs.findByIdAndDelete(id);

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

//get all logs
export const getAllLogs = async (req, res) => {
  try {
    const logs = await Logs.find().populate("car");
    res.status(200).json({
      success: true,
      message: "successful",
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
