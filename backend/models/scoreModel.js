import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  totalTries: { type: Number, required: true },
  successTries: { type: Number, required: true, default: 0 },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
export default UserDetails;
