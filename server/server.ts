import express from "express";

const PORT = parseInt(process.env.PORT || "5000", 10);
const NODE_ENV = process.env.NODE_ENV ?? "development";

const app = express();

app.use(express.json());

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
