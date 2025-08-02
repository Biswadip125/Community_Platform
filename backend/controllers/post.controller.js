import { populate } from "dotenv";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "content is required" });
    }

    const newPost = await Post.create({
      author: req.user._id,
      content,
    });

    return res.status(201).json({
      success: true,
      message: "Post Created Successfully ",
      newPost,
    });
  } catch (err) {
    console.error("Error creating post:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error("Error in Fetching Posts:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing userId",
      });
    }

    const posts = await Post.find({ author: userId })
      .populate("author", "name")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("Error in fetching user posts:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};
