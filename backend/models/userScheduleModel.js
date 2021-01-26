import mongoose from "mongoose";
// stores daily interval (seconds since midnight)
const dailyInterval = mongoose.schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
});
const userScheduleSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isPushEnabled: {
    type: Boolean,
    default: false,
  },
  pushInterval: {
    type: Number, // in seconds,
    default: 3600,
  },
  dailyInterval: dailyInterval,
});

const UserSubscription = mongoose.model("UserSchedule", userScheduleSchema);
export default UserSubscription;
