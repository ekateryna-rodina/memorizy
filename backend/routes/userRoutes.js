import express from "express";
import { register, login } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// test

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json("you are ");
  }
);

export default router;
