const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIdSetter = require("./auto-id-setter.js");

const memoSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    date: { type: Date },
    memo: { type: String },
  });

autoIdSetter(Memo, mongoose, "application", "id");
module.exports = memoSchema;
module.exports = mongoose.model('Memo', memoSchema);