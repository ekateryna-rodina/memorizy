import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import User from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// form paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

// path to public key
const pathToKey = path.join(__dirname, "/secrets/", "pub_key.pem");
const pub_key = fs.readFileSync(pathToKey, "utf8");

const options = {
  secretOrKey: pub_key,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["RS256"],
};

const strategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.id });

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
