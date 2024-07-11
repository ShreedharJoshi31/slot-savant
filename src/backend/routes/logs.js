import express from "express";

import {
  createLog,
  getAllLogs,
  deleteLog,
} from "../controllers/logsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createLog);
router.delete("/:id", verifyToken, deleteLog);
router.get("/", verifyToken, getAllLogs);

export default router;
