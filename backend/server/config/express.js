const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const coockieParser = require("cookie-parser");
const defaultError = require("../middlewares/default-error");

module.exports = (app) => {
  app.use(cors());
  app.use(coockieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  routes(app);

  app.use(defaultError);
};
