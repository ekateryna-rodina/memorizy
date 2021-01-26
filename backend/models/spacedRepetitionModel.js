import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "processing", "processed"],
    default: "pending",
  },
});

const resultSchema = new mongoose.Schema({
  result: {
    type: String,
    enum: ["success", "fail"],
    default: "fail",
  },
});
const spacedRepetitionSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    status: statusSchema,
    lastInterval: {
      type: Number,
      default: 14400,
    },
    lastResult: resultSchema,
  },
  {
    timestamps: true,
  }
);

const SpacedRepetition = mongoose.model(
  "SpacedRepetition",
  spacedRepetitionSchema
);
export default SpacedRepetition;
