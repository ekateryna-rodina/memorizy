import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import User from "../models/userModel.js";

const secret = process.env.AUTH_SECRET;
const options = {
  secretOrKey: "", //process.env.AUTH_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //   algorithms: ["RS256"],
};

const strategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.sub });

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
});

export const auth = (passport) => {
  passport.use(strategy);
};

export default auth;
