import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import postsRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  await connectDB();
});
