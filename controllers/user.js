import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // select password as it is not selected by default
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // return res.status(404).json({
      //   success: false,
      //   message: "User not found",
      // });

      // better way to handle error
      return next(new ErrorHandler("User not found", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // using Util function to send cookie
    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "User created successfully", 201);
  } catch (error) {
    next(error);
  }
};

// non async functions NOT require try-catch block
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      // httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logged out",
    });
};
