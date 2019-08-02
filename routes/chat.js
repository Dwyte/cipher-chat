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

  const { channel } = chat;
  deleteChatsOnChannel(channel);

  res.send(chat);
});

async function deleteChatsOnChannel(channel) {
  const chats = await Chat.find({ channel }).sort({ _id: 1 });
  const limit = channel === "global" ? 100 : 10;
  chats.splice(-limit);
  for (chat of chats) {
    await Chat.findByIdAndDelete(chat._id); 
  }

  console.log("DeleteChatsOnChannel: " + channel);
}

module.exports = router;
