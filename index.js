/*jshint esversion: 6 */

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const config = require("config");
const morgan = require("morgan");
const server = require("http").Server(app);
const socket = require("socket.io")(server);
const path = require("path");

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

const socketConnection = require("./socket");
mongoose
  .connect(
    config.get("MONGODB_URI"),
    {
      useNewUrlParser: true
    },
    (err, db) => {
      console.log(`Connected to MongoDB...`);

      socket.on("connection", socketConnection);
    }
  )
  .catch(er => console.error(er));

// Routes
const user = require("./routes/user");
const chat = require("./routes/chat");

app.use("/api/users", user);
app.use("/api/chats", chat);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.use("*", (req, res) =>
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 4200;
server.listen(port, () => console.log(`Listening to port ${port}...`));
