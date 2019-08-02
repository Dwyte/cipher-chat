/*jshint esversion: 6 */

const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  try {
    const { auth } = jwt.verify(token, config.get("jwtKey"));

    req.auth = auth;
    next();
  } catch (ex) {
    console.log("Invalid Token");
    res.status(400).send("Invalid Token.");
  }
};

module.exports = auth;
