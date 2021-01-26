import Card from "../models/cardModel.js";
import asyncHandler from "express-async-handler";

// @params: card attributes
// @route POST/api/cards
// @access Private
export const saveCard = asyncHandler(async (req, res) => {
  const { question, answer, tags, hints, image } = req.body;

  // validate
  if (question === "" || answer === "") {
    res.status(400).json("Bad request");
  }
  try {
    // create a new card
    const newCard = new Card({ question, answer, tags, hints, image });
    newCard.user = req.user._id;
    const createdCard = await newCard.save();
    res.status(201).json(createdCard);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// @params: card _id
// @route GET/api/cards/:id
// @access Private
export const getCardById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json("No card id");
    }
    const card = await Card.findById(id);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @params: tags as filter (empty by default),
//          sort, pagination
// @route GET/api/cards/
// @access Private
// TODO: filter(successfull, unsuccessfull), pagination, sorting
export const getCards = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const cards = await Card.find({ user: userId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json(error);
  }
});

// @params: card data
// @route PUT/api/cards/:id
// @access Private
export const updateCard = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(401).json("Card does not exist");
    }
    const card = await Card.findById(id);
    //   update attributes
    card.answer = req.params.answer || card.answer;
    card.question = req.params.question || card.question;
    card.hints = req.params.hints || card.hints;
    card.tags = req.params.tags || card.tags;
    card.image = req.params.image || card.image;

    const updatedCard = await card.save();
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(401).json(error);
  }
});

// @params: card id
// @route DELETE/api/cards/:id
// @access Private
export const deleteCard = asyncHandler(async (req, res) => {
  try {
    const { _id, isArchived } = req.params;
    if (!_id) {
      res.status(401).json("Card does not exist");
    }
    if (isArchived) {
      const card = await Card.findById(_id);
      card.isArchived = True;
      await card.save();
      res.status(200).json("Card is archieved");
    }

    await card.remove();
    res.status(200).json("Card is removed");
  } catch (error) {
    res.status(401).json(error);
  }
});
