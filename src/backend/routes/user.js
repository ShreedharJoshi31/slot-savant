// routes/user.js
import express from "express";
import { register, login } from "../controllers/userController.js";

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

export default router;

// // Verify User
// router.get("/verify/:token", async (req, res) => {
//   try {
//     const token = req.params.token;
//     const user = await User.findOne({ verificationToken: token });
//     if (!user) {
//       return res.status(404).send({ message: "Invalid verification token" });
//     }
//     user.verified = true;
//     await user.save();
//     res.status(200).send({ message: "User verified successfully" });
//   } catch (err) {
//     res.status(500).send({ message: "Error verifying user" });
//   }
// });
