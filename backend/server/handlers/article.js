const HttpError = require("../models/http-error");
const Article = require("mongoose").model("Article");
const User = require("mongoose").model("User");

module.exports.getAll = async (req, res) => {
  const all = await Article.find().populate("owner", "email");
  res.status(200).json(all);
};

module.exports.delete = async (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.userData.id;
  
  let owner;
  try {
    owner = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError("Deleting article failed cannot find current user", 500)
    );
  }

  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    return next(
      new HttpError("Deleting article failed cannot fild article", 500)
    );
  }
  
  if (article.owner._id.toString() !== owner.id.toString()) {
    return next(
      new HttpError("Deleting article failed owners aren't same", 500)
    );
  }
  try {
    await Article.findByIdAndDelete(articleId);
  } catch (err) {
    return next(new HttpError("Deleting article failed", 500));
  }

  res.status(200).json({message: 'Successfully deleted'});
};

module.exports.add = async (req, res, next) => {
  const id = req.userData.id;

  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(new HttpError("Creating article failed", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user", 404));
  }

  const newArticle = {
    image: req.body.image,
    title: req.body.title,
    body: req.body.body,
    publishedDate: new Date(),
    owner: user._id,
  };
  const createdArticle = new Article(newArticle);

  try {
    // save the article
    await createdArticle.save();
  } catch (err) {
    return next(new HttpError("Creating article failed!", 500));
  }
  try {
    // push the article to current user articles
    user.articles.push(createdArticle);
    await user.save();
  } catch (err) {
    return next(new HttpError("Creating article failed! User part", 500));
  }
  res.status(200).json(createdArticle);
};
