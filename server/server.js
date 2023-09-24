/**
 * the express.js server
 */

import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";

const app = express();

// database
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE)
  .then(() => console.log("db_connected"))
  .catch((err) => console.log(err));

// apply middlewares
// for parsing incoming json payload from HTTP requests
// set the uploaded payload size to at most 10mb (by default it's 100k)
app.use(express.json({ limit: "10mb" }));
// for logging HTTP requests
app.use(morgan("dev"));
// handling CORS
app.use(cors());

//routes middlewares
// the routers the server uses. now '/api' is the root of the routers
app.use("/api", authRoutes);
app.use("/api", adRoutes);

// listen to port 8000
app.listen(8000, () => console.log("server runninng on port 8000"));
