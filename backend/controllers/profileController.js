"use strict";

import Profile from "../models/profileModel.js";
import asyncHandler from "express-async-handler";
import Card from "../models/cardModel.js";
// get public profile available for other users
export const getPublicProfile = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  let resultData = {};
  if (!userId) {
    res.status(401).json("User's id not provided");
  }
  try {
    // query user excluding the personal settings
    const userProfile = await Profile.findOne({ user: userId }).select(
      "-pushSettings"
    );
    // query basic info about user's network
    let followingIds = userProfile.network.following;
    let followersIds = userProfile.network.followers;

    let followingResults = await Profile.find({
      _id: { $in: followingIds },
    }).select({
      userName: 1,
      bio: 1,
      interests: 1,
    });
    let followersResults = await Profile.find({
      _id: { $in: followersIds },
    }).select({
      userName: 1,
      bio: 1,
      interests: 1,
    });
    // query public cards
    let publicCards = await Card.findMany({
      user: userId,
      isPublic: true,
    }).select({ scoring: 0, spacedRepetition: 0 });
    // construct result
    resultData["baseProfile"] = JSON.stringify(userProfile);
    resultData["network"] = {
      following: JSON.stringify(followingResults),
      followers: JSON.stringify(followersResults),
    };
    resultData["publicCards"] = JSON.stringify(resultData);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json("No data for this user");
  }
});
// get user details and personal settings
export const getUserDetails = asyncHandler(async (req, res) => {
  const {
    user: { _id: id },
  } = req;
  const { id: userId } = req.params;
  if (!userId) {
    res.status(401).json("User's id not provided");
  }
  try {
    // query user excluding the personal settings
    const userProfile = await Profile.findOne({ user: userId });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json("No data for this user");
  }
});
// update personal details and settings
export const updateUserDetails = asyncHandler(async (req, res) => {
  const {
    user: { _id: id },
  } = req;

  if (!userId) {
    res.status(401).json("User's id not provided");
  }
  try {
    const userProfile = await Profile.findOne({ user: id });
    // update fields
    userProfile.userName = req.body.userName || userProfile.userName;
    userProfile.firstName = req.body.firstName || userProfile.firstName;
    userProfile.lastName = req.body.lastName || userProfile.lastName;
    userProfile.image = req.body.image || userProfile.image;
    userProfile.bio = req.body.bio || userProfile.bio;
    userProfile.interests = req.body.interests || userProfile.interests;
    userProfile.pushSettings.isPushEnabled =
      req.body.isPushEnabled || userProfile.pushSettings.isPushEnabled;
    userProfile.pushSettings.pushInterval =
      req.body.pushInterval || userProfile.pushSettings.pushInterval;
    userProfile.pushSettings.dailyIntervals = [
      new Set([
        ...userProfile.pushSettings.dailyIntervals,
        req.body.dailyIntervals,
      ]),
    ];

    await userProfile.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json("No data for this user");
  }
});
// subscribe to other user's public card feed
export const subscribe = asyncHandler(async (req, res) => {
  const {
    user: { _id: id },
  } = req.user;
  const { toFollowId } = req.params.id;
  try {
    // update following collection
    await Profile.findOneAndUpdate(
      { _id: id },
      { upsert: true },
      {
        $addToSet: {
          following: Types.ObjectId(toFollowId),
        },
      }
    );

    // update followers collection
    await Profile.findOneAndUpdate(
      { _id: toFollowId },
      { upsert: true },
      {
        $addToSet: {
          followers: Types.ObjectId(id),
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Followed",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not follow" });
  }
});

export const unSubscribe = asyncHandler(async (req, res) => {
  const {
    user: { _id: id },
  } = req.user;
  const { toUnFollowId } = req.params.id;
  try {
    // update following collection
    await Profile.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          following: Types.ObjectId(toUnFollowId),
        },
      }
    );

    // update followers collection
    await Profile.findOneAndUpdate(
      { _id: toUnFollowId },
      {
        $pull: {
          followers: Types.ObjectId(id),
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "UnFollowed",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not unfollow" });
  }
});
