import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import logger from "morgan";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

// init app
const app = express();

// dotenv
dotenv.config();

// parse json
app.use(bodyParser.json());
// log
app.use(logger("dev"));

// connect db
connectDB();

// passport
app.use(passport.initialize());

// routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
