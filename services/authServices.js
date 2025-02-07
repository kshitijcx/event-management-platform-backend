import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET;

const hashPassword = async (password) => {
  const hashedPwd = await bcrypt.hash(password, 10);
  return hashedPwd;
};

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const validatePassword = async (password, hashedPassword) => {
  const isValid =  await bcrypt.compare(password, hashedPassword);
  return isValid;
};

export { hashPassword, generateToken, validatePassword };
