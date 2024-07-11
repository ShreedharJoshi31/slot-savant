import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    user.verificationToken = token;
    await user.save();
    res.status(200).send({ token, userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error logging in" });
  }
};
