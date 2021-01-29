"use strict";

import asyncHandler from "express-async-handler";
import Card from "../models/cardModel.js";
import { ScoreResultEnum, StatusEnum } from "../utils/enum.js";
import {
  minIntervalRepetition,
  maxIntervalRepetition,
} from "..utils/constants.js";
export const updateScoreAndSpacedRepetition = asyncHandler(async (req, res) => {
  const { card, result } = req.body;
  cons;
  try {
    const card = await Card.findById(card);
    if (!card) {
      res.status(404).json("Card does not exist");
    }
    // update score
    let addToScore = result === ScoreResultEnum.success ? 1 : 0;
    card.scoring.totalTries += 1;
    card.scoring.successTries += addToScore;
    // update spaced repetition details
    const lastInterval = card.spacedRepetition.lastInterval;
    // update inetrval depending on the last result
    let newInterval =
      result === ScoreResultEnum.fail
        ? minIntervalRepetition
        : lastInterval >= maxIntervalRepetition
        ? maxIntervalRepetition
        : lastInterval * 2;
    card.spacedRepetition.lastInterval = newInterval;
    // update last result
    card.spacedRepetition.lastResult = result;
    // update status
    let newStatus =
      result === ScoreResultEnum.fail
        ? StatusEnum.processing
        : lastInterval >= maxIntervalRepetition
        ? StatusEnum.processed
        : StatusEnum.pending; //TODO: job to update the status from pending to processing
    card.spacedRepetition.status = newStatus;

    // update the card
    await card.save();
    res.status(200).json("The card is updated");
  } catch (error) {
    res.status(500).json(error);
  }
});
