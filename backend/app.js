import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  await connectDB();
});
