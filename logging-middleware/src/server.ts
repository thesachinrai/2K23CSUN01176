import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userroutes";
import { requestLogger, Log } from "./middleware/logger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api", userRoutes);

app.get("/", async (req, res) => {
  Log("backend", "info", "route", "Health check endpoint called").catch(console.error);
  res.json({
    success: true,
    message: "Server running successfully",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});