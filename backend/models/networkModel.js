import mongoose from "mongoose";

const userSubscriptionSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  subscribedOn: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const UserSubscription = mongoose.model(
  "UserSubscription",
  userSubscriptionSchema
);
export default UserSubscription;
