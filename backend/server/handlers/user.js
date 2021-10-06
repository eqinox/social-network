let User = require("mongoose").model("User");
let encryption = require("../utilities/encryption");
const jwt = require("jsonwebtoken");
const logger = require("../utilities/logger");
const environment = process.env.NODE_ENV || "development";
const settings = require("../config/settings")[environment];
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Article = require("../models/article");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser) {
    const error = new HttpError(
      "User exist already, please login instead.",
      422
    );
    return next(error);
  }

  const incomingUser = {
    password: req.body.password,
    email: req.body.email,
    roles: ["User"],
  };

  const salt = encryption.generateSalt();
  const password = encryption.generateHashedPassword(
    salt,
    incomingUser.password
  );

  incomingUser.password = password;
  incomingUser.salt = salt;

  const createdUser = new User(incomingUser);

  try {
    const user = await createdUser.save();
    const payload = { id: user._id };
    const token = jwt.sign(payload, settings.secret, {
      expiresIn: settings.expireToken,
    });
    const message = {
      message: `Successfuly Registered ${user.email}`,
      email: user.email,
      id: user._id,
      token,
      favourite: user.favourite,
    };
    logger.tempLog.info("User Register: ", message);
    res.status(201).json(message);
  } catch (err) {
    console.log(err);
    logger.errorLog.error("Register User Error:", {
      error: err,
      body: hidePassword(req.body),
      headers: req.headers,
    });
    return next(new HttpError("Creating user failed", 400));
  }
};

// hide the password because dont want people to see the real pass (for logging)
function hidePassword(request) {
  if (request.password && request.password2) {
    (request.password = "***"), (request.password2 = "***");
    return request;
  } else {
    return request;
  }
}

module.exports.login = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("User not found!", 404));
  }

  if (!user.authenticate(req.body.password)) {
    return next(new HttpError("Invalid user credentials!", 404));
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, settings.secret, {
    expiresIn: settings.expireToken,
  });
  const message = {
    message: `Successfuly logged in ${user.email}`,
    email: user.email,
    id: user._id,
    token,
    favourite: user.favourite,
  };
  logger.tempLog.info("User Login: ", message);
  res.status(200).json(message);
};

module.exports.logout = (req, res) => {
  //   if (req.isAuthenticated()) {
  //     logger.tempLog.info("Logout User:", {
  //       message: `Succesfuly logged our ${req.user.email}`,
  //     });
  //     res
  //       .status(200)
  //       .json({
  //         success: true,
  //         message: `Succesfuly logged out ${req.user.email}`,
  //       });
  //     req.logout();
  //   } else {
  //     res.status(401).json({ success: false, message: "User not found" });
  //   }
};

module.exports.changePassword = (req, res) => {
  const id = req.body.id;
  console.log(req);

  // User.findById(req.user._id, function (err, user) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         console.log(user);
  //     }
  // })
};

module.exports.addToFavourite = async (req, res, next) => {
  const userId = req.userData.id;
  const articleId = req.body.id;

  try {
    const user = await User.findById(userId);
    const article = await Article.findById(articleId);
    if (!user || !article) {
      return next("Adding to favourite failed", 500);
    }
    user.favourite.push(article);
    const savedUser = await user.save();

    let result = [];
    // if favourite are created for the first time..
    if (savedUser.favourite[0].usersFavourite) {
      result = savedUser.favourite.map((item) => {
        return item._id; // map only id's
      });
      res.status(200).json({ message: result });
    } else {
      res.status(200).json({ message: savedUser.favourite });
    }

    article.usersFavourite.push(user);
    await article.save();
  } catch (error) {
    return next("Adding to favourite failed", 500);
  }
};

module.exports.removeFromFavourite = async (req, res, next) => {
  const userId = req.userData.id;
  const articleId = req.body.id;

  try {
    const user = await User.findById(userId);
    const article = await Article.findById(articleId);
    user.favourite.pull({ _id: articleId });
    const savedUser = await user.save();
    res.status(200).json({ message: savedUser.favourite });
    article.usersFavourite.pull({ _id: userId });
    await article.save();
  } catch (error) {
    return next("Removing from favourite failed", 500);
  }
};
