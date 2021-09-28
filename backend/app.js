const express = require("express");

const app = express();
const environment = process.env.NODE_ENV || "development";
const settings = require("./server/config/settings")[environment];

const port = settings.port;

require("./server/config/database")(settings);
require("./server/config/express")(app, settings);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
