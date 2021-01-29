import mongoose from "mongoose";
import bcrypt from "bcrypt";
// create schema
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  // do not encrypt if password is not modified
  if (!user.isModified("password")) {
    next();
  }

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// compare entered and hashed passwords
userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
