const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule.js");
const { NotFoundError, InputError, DuplicateError } = require("./error-handler");

router.get("/users/:UID/schedule", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        
        res.status(200).send(await Schedule.find({}));
    } catch (err) {
        return next(err);
    }
});

router.get("/users/:UID/schedule/:SID", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        if (isNaN(parseInt(req.params.SID))) {
            throw new InputError("Invalid SID.");
        }
        const targetSchedule = await Schedule.findOne({ SID: req.params.SID });
        if (!targetSchedule) {
            throw new NotFoundError("Schedule");
        }
        res.status(200).send(targetSchedule);
    } catch (err) {
        return next(err);
    }
});

router.post("/users/:UID/schedule", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        if (req.body.SID === undefined) {
            throw new InputError("'SID' parameter is empty.");
        }
        if (req.body.date === undefined) {
            throw new InputError("'date' parameter is empty.");
        }
        if (req.body.schedule_name === undefined) {
            throw new InputError("'schedule_name' parameter is empty.");
        }

        const schedule = new Schedule();
        schedule.UID = req.body.UID;
        schedule.SID = req.body.SID;
        schedule.date = req.body.date;
        schedule.schedule_name = req.body.schedule_name;   
        schedule.schedule_detail = req.body.schedule_detail;

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
});

router.put("/users/:UID/schedule/:SID", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        if (isNaN(parseInt(req.params.SID))) {
            throw new InputError("Invalid SID.");
        }
        if (req.body.date === undefined) {
            throw new InputError("'date' parameter is empty.");
        }
        if (req.body.schedule_name === undefined) {
            throw new InputError("'schedule' parameter is empty.");
        }

        const targetSchedule = await Schedule.findOne({ SID: req.params.SID });
        if (!targetSchedule) {
            throw new NotFoundError("Schedule");
        }

        targetSchedule.date = req.body.date;
        targetSchedule.schedule_name = req.body.schedule_name;
        targetSchedule.schedule_detail = req.body.schedule_detail;

        await targetSchedule.save();
        return res.status(200).send(targetSchedule);
    } catch (err) {
        return next(err);
    }
});

router.delete("/users/:UID/schedule/:SID", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.UID))) {
            throw new InputError("Invalid UID.");
        }
        if (isNaN(parseInt(req.params.SID))) {
            throw new InputError("Invalid SID.");
        }
        const targetSchedule = await Schedule.findOne({ UID: req.params.SID });
        if (!targetSchedule) {
            throw new NotFoundError("Schedule");
        }
        const deleteSchedule = await Schedule.deleteOne({ SID: req.params.SID });
        if (deleteSchedule.deletedCount === 1) {
            res.status(200).send({ SID: targetSchedule.SID, UID: targetSchedule.UID, date: targetSchedule.date, schedule_name: targetSchedule.schedule_name, schedule_detail: targetSchedule.schedule_detail });
        } else {
            throw new NotFoundError("Schedule");
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;