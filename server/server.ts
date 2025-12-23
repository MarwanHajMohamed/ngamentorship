import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const PORT = parseInt(process.env.PORT, 10);
const NODE_ENV = process.env.NODE_ENV;

const app = express();

app.use(express.json());

connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
