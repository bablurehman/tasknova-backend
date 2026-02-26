import dns from "node:dns/promises";
dns.setServers(["8.8.8.8"]); // Use Google
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

await connectDB();

app.use(cors({ origin: 'https://tasknovaa.vercel.app', credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
