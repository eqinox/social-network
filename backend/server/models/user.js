const mongoose = require("mongoose");
const encryption = require("../utilities/encryption");
const uniqueValiddator = require("mongoose-unique-validator");

const ERROR_VALIDATION_MESSAGE = "${PATH} is required";

let userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String, required: ERROR_VALIDATION_MESSAGE },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: ERROR_VALIDATION_MESSAGE, unique: true },
  roles: [{ type: String }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  salt: { type: String, required: ERROR_VALIDATION_MESSAGE },
});

userSchema.method({
  authenticate: function (password) {
    let hashedPassword = encryption.generateHashedPassword(this.salt, password);

    if (hashedPassword === this.password) {
      return true;
    }
    return false;
  },
});

userSchema.plugin(uniqueValiddator);

const User = mongoose.model("User", userSchema);

module.exports = User;
