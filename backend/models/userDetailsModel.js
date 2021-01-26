import mongoose from "mongoose";

const userDetailsSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  bio: { type: String },
  interests: [{ type: String }],
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
export default UserDetails;
