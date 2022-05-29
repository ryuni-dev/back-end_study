const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIdSetter = require("./auto-id-setter.js");

const userSchema = new Schema({
  //UID: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  birthday: { type: Date}
});

autoIdSetter(userSchema, mongoose, "application", "UID");
module.exports = userSchema;
module.exports = mongoose.model('User', userSchema);
