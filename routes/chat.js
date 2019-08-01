const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { Chat, validate } = require("../models/chat");

// Get Active User
router.put("/", [auth], async (req, res) => {
  const chats = await Chat.find(req.body);

  res.send(chats);
});

router.get("/:channel", [auth], async (req, res) => {
  const { channel } = req.params;
  const limit = Number(req.query.limit);

  let chats = await Chat.find({ channel }).sort({ _id: 1 });

  chats = chats.splice(-limit);

  res.send(chats);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let chat = new Chat(req.body);
  chat = await chat.save();

  res.send(chat);
});

module.exports = router;
