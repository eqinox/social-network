const HttpError = require("../models/http-error");
const Article = require("mongoose").model("Article");
const User = require("mongoose").model("User");

module.exports.getAll = async (req, res) => {
  const all = await Article.find();
  res.status(200).json(all);
};

module.exports.delete = (req, res) => {
  // console.log(req.body);
  // const articleId = req.params.id;
  // const userId = req.userData.id;
  // User.findById(userId).then((user) => {
  //   Article.findById(articleId).then((article) => {
  //     console.log(article.owner._id);
  //     console.log(user._id);
  //     Article.findByIdAndDelete(articleId, (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("SUCCESS");
  //       }
  //     });
  //   });
  // });
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
