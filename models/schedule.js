const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIdSetter = require("./auto-id-setter.js");

const scheduleSchema = new Schema({
    UID: { type: Number, required: true, unique: true },
    //SID: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    schedule_name: { type: String, required: true, unique: true},
    schedule_detail: { type: String},
  });

autoIdSetter(scheduleSchema, mongoose, "application", "SID");
module.exports = scheduleSchema;
module.exports = mongoose.model('Schedule', scheduleSchema);