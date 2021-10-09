const mongoose = require("mongoose");

const ERROR_VALIDATION_MESSAGE = "${PATH} is required";

let noteSchema = new mongoose.Schema({
  text: {type: String},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article'}
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
