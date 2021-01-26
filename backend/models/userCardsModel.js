import mongoose from "mongoose";
// create user cards schema
const userCardsSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "Person" },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

const UserCards = mongoose.model("UserCards", userCardsSchema);
export default UserCards;
