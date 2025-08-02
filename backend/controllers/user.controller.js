import mongoose from "mongoose";
import { User } from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invaild or missing userId",
      });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error fetching User Profile:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};
