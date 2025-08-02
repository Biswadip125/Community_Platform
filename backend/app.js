import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import PostsRouter from "./routes/post.routes.js";
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", PostsRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  await connectDB();
});
