import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await User.findById({ _id: decoded.userId }).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
};
