import express from "express";
import { register } from "userController.js";

const router = express.Router();

// register
router.get("/register", register);

module.exports = router;
