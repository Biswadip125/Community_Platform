import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters long ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: "Account Created Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
        },
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      messsage: "Internal Server Error ",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existedUser = await User.findOne({ email });

    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existedUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    const token = generateToken(existedUser._id);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in Successfully",
        _id: existedUser._id,
        name: existedUser.name,
        email: existedUser.email,
        bio: existedUser.bio,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const logout = async (req, res) => {
  return res.cookie("token", "").status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
