import jsonwebtoken from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// @param: the user object
// Method to generate jwt token
const issueJWT = async (user) => {
  const id = user._id.toString();
  const expiresIn = "1d";
  // form paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(path.dirname(__filename));

  // path to public key
  const pathToKey = path.join(__dirname, "/secrets/", "priv_key.pem");
  const priv_key = fs.readFileSync(pathToKey, "utf8");

  //   sign token
  const signedToken = await jsonwebtoken.sign({ id }, priv_key, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: `Bearer ${signedToken}`,
    iat: Date.now(),
    expires: expiresIn,
  };
};

export default issueJWT;
