const handlers = require("../handlers");

const { check } = require("express-validator");
const isAuth = require("../middlewares/is-auth");
const HttpError = require("../models/http-error");

module.exports = (app) => {
  app.post("/users/login", handlers.user.login);
  app.post(
    "/users/register",
    [
      check("email").normalizeEmail().isEmail(),
      check("password").isLength({ min: 3, max: 20 }),
    ],
    handlers.user.register
  );

  // app.post('/users/logout', isAuth, handlers.user.logout);

  app.get("/articles", handlers.article.getAll);
  app.post("/articles/add", isAuth, handlers.article.add);
  app.delete("/articles/:id", isAuth, handlers.article.delete);
  // app.patch('/articles/:id', isAuth, handlers.article)

  // nothing match and throw error
  app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404);
  });
};
