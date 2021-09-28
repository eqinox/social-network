const jwt = require("jsonwebtoken");
const environment = process.env.NODE_ENV || "development";
const settings = require("../config/settings")[environment];

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return res.status(401).send("Unauthorized!");
    }
    const decodedToken = jwt.verify(token, settings.secret);
    req.userData = { id: decodedToken.id };
    next();
  } catch (error) {
    return res.status(401).send("Authentication Failed!");
  }
};
