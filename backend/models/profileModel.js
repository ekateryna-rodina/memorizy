import mongoose from "mongoose";
// create schema
const profileSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true, // cannot update email
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    bio: { type: String },
    interests: [{ type: String }],
    pushSettings: {
      isPushEnabled: {
        type: Boolean,
        default: false,
      },
      pushInterval: {
        type: Number, // in seconds,
        default: 3600,
      },
      dailyIntervals: [
        {
          start: { type: Number, required: true },
          end: { type: Number, required: true },
        },
      ],
    },
    network: {
      following: [{ type: Schema.Types.ObjectId, ref: "User" }],
      followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  {
    timestamps: true,
  }
);

// dates
profileSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("pushSettings")) {
    next();
  }

  next();
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
