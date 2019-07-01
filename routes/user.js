const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error);

    let user = new User(req.body);
    user = await user.save();

    res.status(201).send(user);
});

router.delete("/:_id", async (req, res) => {
    let user = await User.findByIdAndDelete(req.params._id);
    if(!user) return res.status(404).send("User was not found.");

    res.send(user);
});

module.exports = router;
