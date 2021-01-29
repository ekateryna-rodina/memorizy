import mongoose from "mongoose";
const { Schema } = mongoose;

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
    scoring: {
      totalTries: { type: Number, required: true, default: 0 },
      successTries: { type: Number, required: true, default: 0 },
    },
    spacedRepetition: {
      status: {
        type: String,
        enum: ["pending", "processing", "processed"],
        default: "pending",
      },
      lastInterval: {
        type: Number,
        default: 14400,
      },
      lastResult: {
        type: String,
        enum: ["success", "fail"],
        default: "fail",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;
