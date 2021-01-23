import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import logger from "morgan";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { auth } from "./middleware/auth.js";

// init app
const app = express();

// dotenv
dotenv.config();

// connect db
connectDB();

// parse json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pass the global passport object into the configuration function
auth(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// log
app.use(logger("dev"));

// routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
