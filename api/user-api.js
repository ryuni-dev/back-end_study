const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { NotFoundError, InputError, DuplicateError } = require("./error-handler");

router.get("/users", async (req, res) => {
    res.send(await User.find({}));
});

router.post("/users", async (req, res, next) => {
    try {
        if (req.body.name === undefined) {
            throw new InputError("'name' parameter is empty.");
        }

        const user = new User();
        user.UID = req.body.UID;
        user.name = req.body.name;
        user.birthday = req.body.birthday;

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
});

router.get("/users/:UID", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        const targetUser = await User.findOne({ UID: req.params.UID });
        if (!targetUser) {
            throw new NotFoundError("User");
        }
        res.status(200).send(targetUser);
    } catch (err) {
        return next(err);
    }
});

router.put("/users/:UID", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        if (req.body.name === undefined) {
            throw new InputError("'name' parameter is empty.");
        }
        if (req.body.birthday === undefined) {
            throw new InputError("'birthday' parameter is empty.");
        }

        const targetUser = await User.findOne({ UID: req.params.UID });
        if (!targetUser) {
            throw new NotFoundError("User");
        }
        //targetUser.id = req.body.id;
        targetUser.name = req.body.name;
        targetUser.birthday = req.body.birthday;

        await targetUser.save();
        return res.status(200).send(targetUser);
    } catch (err) {
        return next(err);
    }
});

router.delete("/users/:UID", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        const targetUser = await User.findOne({ UID: req.params.UID });
        if (!targetUser) {
            throw new NotFoundError("User");
        }
        const deleteUser = await User.deleteOne({ UID: req.params.UID });
        if (deleteUser.deletedCount === 1) {
            res.status(200).send({ UID: targetUser.UID, name: targetUser.name, birthday: targetUser.birthday });
        } else {
            throw new NotFoundError("User");
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;