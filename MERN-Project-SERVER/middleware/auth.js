// middleware
// as soon as somebody likes or clicks a button
// - 1st we go through auth middleware -> auth middleware confirms or denies that request
// -- if all th if else is correct we call the next() and only then we call the like controller

import jwt from "jsonwebtoken";

const secret = "secret";

const auth = async (req, res, next) => {
  try {
    // checking if the token is valid

    // - getting token from the front-end
    const token = req.headers.authorization.split(" ")[1];

    // - checking if the token is google's or ours
    const isCustomAuth = token.length < 500;

    // data that we want to get from the token
    let decodedData;

    // - if the token is our own and if the token is custom auth
    if (token && isCustomAuth) {
      // secret is our secret
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      // sub is google's name for a specefic id that diffrentiate every google user
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
