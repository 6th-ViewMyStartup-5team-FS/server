const express = require("express");
const usersRouter = require("./users.module");
const startupsRouter = require("./startups.module");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/startups", startupsRouter);

module.exports = router;
