import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import carsRoute from "./routes/cars.js";
import parkingRoute from "./routes/parking.js";
import logsRoute from "./routes/logs.js";
import userRoute from "./routes/user.js";
import dashboardData from "./utils/dashboardData.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// Database connection
mongoose.set("strictQuery", false);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("Mongodb database connection failed");
  }
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/parking", parkingRoute);
app.use("/api/v1/logs", logsRoute);

app.get("/api/v1/dashboard", dashboardData);

app.listen(port, () => {
  connectToDatabase();
  console.log("Server listening on port", port);
});
