const express = require("express");
const router = express.Router();
const pbkdf2 = require("pbkdf2");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");

const { User, validate, generateToken } = require("../models/user");

// Get Active User
router.get("/auth", [auth], async (req, res) => {
  const { auth } = req;

  const user = await User.findOne({ auth });
  if (!user) return res.status(404).send("User not found");

  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find()
    .sort({ _id: 1 })
    .limit(10);

  res.send(users);
});

router.put("/searchUser", [auth], async (req, res) => {
  const users = await User.find(req.body)
    .sort({ _id: 1 })
    .limit(12);

  res.send(users);
});

router.put("/getUser", [auth], async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) res.status(404).send("Error 404: User not found");

  res.send(user);
});

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  res.send(user);
});

// Register
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  let { username, auth } = req.body;

  const salt = bcrypt.genSaltSync(10000);
  auth = pbkdf2.pbkdf2Sync(auth, salt, 50000, 64, "sha512").toString("hex");

  let user = new User({ username, auth, salt });
  user = await user.save();

  res.status(201).send(user);
});

// Login / Authentication
router.post("/auth", async (req, res) => {
  let { username, auth } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(404).send("Wrong credentials");

  const { salt, auth: _auth } = user;
  auth = pbkdf2.pbkdf2Sync(auth, salt, 50000, 64, "sha512").toString("hex");

  if (auth !== _auth) return res.status(404).send("Wrong credentials");

  const userToken = generateToken(auth);

  res.send({ userToken, user });
});

// Update Bio
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;

  if (_id === "undefined") return res.status(400).send("Invalid Parameters");

  let user = await User.findByIdAndUpdate(
    _id,
    { $set: req.body },
    { useFindAndModify: false, new: true }
  );
  if (!user) return res.status(404).send("User was not found.");

  user = await user.save();
  res.send(user);
});

// Account Deletion
router.delete("/:_id", [auth], async (req, res) => {
  let user = await User.findByIdAndDelete(req.params._id);
  if (!user) return res.status(404).send("User was not found.");

  res.send(user);
});

module.exports = router;
