import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv"; // for environment variables
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorHandling.js";
import cors from "cors"; // for cross origin resource sharing

const app = express();

config({
  path: "./config.env",
});

// Middlewares (ORDER IS IMPORTANT)
// Keep json at top else it will not be able to
// parse the incoming request body when accessing any route
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // to allow cookies from frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("HELLOO");
});

// Using Error Middleware
app.use(errorMiddleware);

export default app;
