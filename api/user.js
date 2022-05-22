const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { NotFoundError, InputError, DuplicateError } = require("./error-handler");

router.get("/users", async (req, res) => {
    res.send(await User.find({}));
});

router.post("/users", async (req, res, next) => {
    try {
        if (req.body.id === undefined) {
            throw new InputError("'id' parameter is empty.");
        }
        if (req.body.name === undefined) {
            throw new InputError("'name' parameter is empty.");
        }

        const checkReview = await Review.findOne({ shopName: req.body.shopName });

        if (checkReview) {
            throw new DuplicateError("Review");
        }
        const user = new User();
        user.id = req.body.id;
        user.name = req.body.name;
        user.birthday = req.body.birthday;

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
});

router.get("/users/:id", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid review id.");
        }
        const targetUser = await User.findOne({ id: req.params.id });
        if (!userReview) {
            throw new NotFoundError("User");
        }
        res.status(200).send(targetUser);
    } catch (err) {
        return next(err);
    }
});

router.put("/users/:id", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid user id.");
        }
        if (req.body.name === undefined) {
            throw new InputError("'name' parameter is empty.");
        }
        if (req.body.birthday === undefined) {
            throw new InputError("'birthday' parameter is empty.");
        }

        const targetUser = await User.findOne({ id: req.params.id });
        if (!targetUser) {
            throw new NotFoundError("User");
        }
        targetUser.id = req.body.id;
        targetUser.name = req.body.name;
        targetUser.birthday = req.body.birthday;

        await targetUser.save();
        return res.status(200).send(targetUser);
    } catch (err) {
        return next(err);
    }
});

router.delete("/users/:id", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid user id.");
        }
        const targetUser = await User.findOne({ id: req.params.id });
        if (!targetUser) {
            throw new NotFoundError("User");
        }
        const deleteUser = await User.deleteOne({ id: req.params.id });
        if (deleteUser.deletedCount === 1) {
            res.status(200).send({ id: targetUser.id, shopName: targetUser.name, author: targetUser.birthday });
        } else {
            throw new NotFoundError("User");
        }
    } catch (err) {
        return next(err);
    }
});

router.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status).json({ message: err.message });
});