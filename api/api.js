const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Schedule = require("../models/schedule.js");
const Memo = require("../models/memo.js");

router.get("/users", async (req, res) => {
    res.send(await User.find({}));
});