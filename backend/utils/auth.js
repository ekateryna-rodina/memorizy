import jsonwebtoken from "jsonwebtoken";

// @param: the user object
// Method to generate jwt token
const issueJWT = async (user) => {
  const id = user._id.toString();
  const expiresIn = "1d";
  const key = process.env.AUTH_SECRET;

  //   sign token
  const signedToken = await jsonwebtoken.sign({ id }, key, {
    expiresIn: expiresIn,
  });

  return {
    token: `Bearer ${signedToken}`,
    iat: Date.now(),
    expires: expiresIn,
  };
};

export default issueJWT;
