import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createPost,
  getAllPosts,
  getUserPosts,
} from "../controllers/post.controller.js";

const router = Router();

router
  .route("/")
  .get(isAuthenticated, getAllPosts)
  .post(isAuthenticated, createPost);

router.get("/user/:userId", isAuthenticated, getUserPosts);

export default router;
