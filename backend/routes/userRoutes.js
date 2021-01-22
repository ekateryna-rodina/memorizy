import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// register
router.get("/register", register);

// login
router.get("/login", login);

export default router;
