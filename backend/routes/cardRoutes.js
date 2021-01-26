import express from "express";
import {
  saveCard,
  getCardById,
  getCards,
  updateCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = express.Router();

// save a new card
router.post("/", saveCard);

// get card by id
router.get("/:id", getCardById);

// get cards
router.get("/", getCards);

// update the card
router.put("/:id", updateCard);

// delete or archive the card
router.put("/:id", deleteCard);

export default router;
