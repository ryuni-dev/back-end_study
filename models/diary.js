const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIdSetter = require("./auto-id-setter.js");

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  birthday: { type: Date}
});

const scheduleSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    schedule_name: { type: String, required: true, unique: true},
    schedule_detail: { type: String},
  });

const memoSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    date: { type: Date },
    memo: { type: String },
  });

autoIdSetter(User, mongoose, "application", "id");
autoIdSetter(Schedule, mongoose, "application", "id");
autoIdSetter(Memo, mongoose, "application", "id");

module.exports = userSchema;
module.exports = scheduleSchema;
module.exports = memoSchema;

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Schedule', scheduleSchema);
module.exports = mongoose.model('Memo', memoSchema);