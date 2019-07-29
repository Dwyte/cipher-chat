const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { OnlineUser } = require("../models/onlineUser");

router.get("/", [auth], async (req, res) => {
    let onlineUsers = await OnlineUser.find().populate("user");

    res.send(onlineUsers);
});

module.exports = router;
