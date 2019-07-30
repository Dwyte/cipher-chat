const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlineUserSchema = mongoose.Schema({
  socketId: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User"
  }
});

const OnlineUser = mongoose.model("OnlineUSer", onlineUserSchema);

module.exports = {
  OnlineUser
};
