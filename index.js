const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const config = require("config");
const morgan = require("morgan");

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Routes
const user = require("./routes/user");
app.use("/api/users", user);

mongoose
  .connect(config.get("MONGODB_URI"), { useNewUrlParser: true })
  .then(() => console.log(`Connected to MongoDB...`))
  .catch(er => console.error(er));

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening to port ${port}...`));
