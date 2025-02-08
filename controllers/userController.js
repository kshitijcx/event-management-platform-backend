import User from "../models/userModel.js";
import {
  generateToken,
  hashPassword,
  validatePassword,
} from "../services/authServices.js";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ message: "User exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password:hashedPassword });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ id:newUser._id,name, token, message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user.", error: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentails" });
    }
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(user);

    res.status(200).json({ id:user._id, name:user.name, token, message: "Signed in" });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};

export { signup, signin };
