import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const PORT = parseInt(process.env.PORT || "5001", 10);
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

connectDB();

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (_req, res) => {
  res.send("API IS RUNNING...");
});

app.use("/api/users", userRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
