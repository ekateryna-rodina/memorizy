"use strict";

import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import authUtil from "../utils/auth.js";

const { issueJWT } = authUtil;

export const register = asyncHandler(async (req, res) => {
  const { userName, email, password, password2 } = req.body;
  let errors = [];
  // validation of required fields
  if (!userName || !email || !password || !password2) {
    errors.push({ msg: "Please fill all the fields" });
  }
  // validation of passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  // validation of passwords lenght
  if (password && password.length < 6) {
    errors.push({
      msg: "Passwords is required to be at least 6 characters long",
    });
  }

  if (errors.length > 0) {
    res.status(400).json({
      errors: errors,
      data: { userName, email, password, password2 },
    });
  } else {
    // create new user
    try {
      // check if user exists
      const userExists = await User.findOne({ email: email });
      const userNameIsUsed = await User.findOne({ userName: userName });
      if (userExists) {
        errors.push({ msg: "User already exists" });
        res.status(400).json({
          errors: errors,
          data: { userName, email, password, password2 },
        });
      }
      if (userNameIsUsed) {
        errors.push({ msg: "User name is not available" });
        res.status(400).json({
          errors: errors,
          data: { userName, email, password, password2 },
        });
      } else {
        const newUser = new User({
          userName,
          email,
          password,
        });

        // save user
        const savedUser = await newUser.save();
        // issue jwt
        const { token, expires, iat } = await issueJWT(savedUser);
        res.status(200).json({
          success: true,
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
          },
          token: token,
          issued: iat,
          expiresIn: expires,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Bad request" });
    }
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // if user is not registered
      res.status(401).json({ msg: "User is not registered" });
    } else {
      // verify password
      const isPasswordValid = await user.matchPassword(req.body.password);
      if (!isPasswordValid) {
        // password is incorrect
        res.status(401).json({ msg: "Please enter valid credentials" });
      }

      // issue jwt
      const { token, expires, iat } = await issueJWT(user);
      const { userName, email } = user;
      res.status(200).json({
        token: token,
        issued: iat,
        expiresIn: expires,
        success: true,
        user: { userName, email },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Bad request" });
  }
});
