const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  pid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  birthday: { type: Date}
});

const scheduleSchema = new mongoose.Schema({
    pid: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    schedule_name: { type: String, required: true, unique: true},
    schedule_detail: { type: String},
  });

const memoSchema = new mongoose.Schema({
    pid: { type: Number, required: true, unique: true },
    date: { type: Date },
    memo: { type: String },
  });

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Schedule', scheduleSchema);
module.exports = mongoose.model('Memo', memoSchema);