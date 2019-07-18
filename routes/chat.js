const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { Chat } = require("../models/chat");

// Get Active User
router.put("/", [auth], async (req, res) => {
  const chats = await Chat.find(req.body);

  res.send(chats);
});

module.exports = router;
