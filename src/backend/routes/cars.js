import express from "express";

import {
  createCar,
  getAllCars,
  deleteCar,
} from "../controllers/carsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createCar);
router.delete("/:id", verifyToken, deleteCar);
router.get("/", verifyToken, getAllCars);

export default router;
