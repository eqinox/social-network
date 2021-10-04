const HttpError = require("../models/http-error");
const Article = require("mongoose").model("Article");
const User = require("mongoose").model("User");

module.exports.getAll = async (req, res) => {
  const all = await Article.find().populate("owner", "email");
  res.status(200).json(all);
};

module.exports.test = (req, res) => {
  console.log(req.file);
  res.status(200).json({ message: "success" });
};

module.exports.getById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    return next(new HttpError("Cannot find article!", 500));
  }
};

module.exports.edit = async (req, res, next) => {
  const { image, title, body } = req.body;
  const articleId = req.params.id;
  const userId = req.userData.id;
  console.log(articleId);
  console.log(userId);

  let owner;
  let article;
  try {
    owner = await User.findById(userId);
    article = await Article.findById(articleId);
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong, could not update the article cannot find owner or article",
        500
      )
    );
  }

  // try {
  // } catch (error) {
  //   return next(new HttpError('Something went wrong, could not update the article', 500))
  // }

  if (owner.id.toString() !== article.owner._id.toString()) {
    return next(
      new HttpError(
        "Something went wrong, could not update the article owner id and article owner id are not same",
        500
      )
    );
  }

  article.image = image;
  article.title = title;
  article.body = body;
  try {
    await article.save();
  } catch (error) {
    return next(
      new HttpError(
        "Something went wrong, could not update the article error saving",
        500
      )
    );
  }

  res.status(200).json({ message: "successfully updated" });
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

  res.status(200).json({ message: "Successfully deleted" });
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
    image: req.file.path
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
  res.status(200).json({ message: "Successfuly created article" });
};
