import express from "express";

import {
  createParking,
  getAllParkings,
  deleteParking,
} from "../controllers/parkingController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createParking);
router.delete("/:id", verifyToken, deleteParking);
router.get("/", verifyToken, getAllParkings);

export default router;
