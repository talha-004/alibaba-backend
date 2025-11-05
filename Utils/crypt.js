import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashPwt = (plainTxt, salt = 2) => {
  return bcrypt.hash(plainTxt, salt);
};

export const comparePwt = (plainTxt, hashPwt) => {
  return bcrypt.compare(plainTxt, hashPwt);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 120 });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};
