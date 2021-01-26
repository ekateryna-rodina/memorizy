import mongoose from "mongoose";
const { Schema, Types } = mongoose;

// create schema
const cardSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    tags: [
      {
        type: String,
        default: ["other"],
      },
    ],
    hints: {
      type: [{ type: String, maxlength: 100 }],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "No user id found"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
