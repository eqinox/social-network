const mongoose = require("mongoose");

const ERROR_VALIDATION_MESSAGE = "${PATH} is required";

let articleSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String, required: ERROR_VALIDATION_MESSAGE },
  body: { type: String },
  publishedDate: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
