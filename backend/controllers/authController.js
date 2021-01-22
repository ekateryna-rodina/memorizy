import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import passport from "passport";
import localPassport from "passport-local";

// destruct local strategy
const { Strategy } = localPassport;
export const register = asyncHandler(async (req, res) => {
  res.json("register");
});

export const login = asyncHandler(async (req, res) => {
  res.json("login");
});
