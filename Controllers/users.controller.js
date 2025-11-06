import UserModel from "../Models/users.model.js";
import { comparePwt, generateToken, hashPwt } from "../Utils/crypt.js";

export const getAllUsers = async (req, res, next) => {
  try {
    let allUser = await UserModel.find();
    res.status(200).json({
      success: true,
      message: "Fetch Data Successfully!",
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      err: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = await hashPwt(password, 10);

    const registerUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(200).json({
      success: true,
      message: "User registered Successfully!",
      data: registerUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      err: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const registerUser = await UserModel.findOne({ email });

    if (registerUser) {
      let comparePassword = await comparePwt(password, registerUser.password);
      if (comparePassword) {
        const token = generateToken({ userId: registerUser._id });
        res.status(200).json({
          success: true,
          message: "Loggin Successfully",
          data: {
            name: registerUser.name,
            email: registerUser.email,
            token,
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid Credentials!",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      err: error.message,
    });
  }
};
