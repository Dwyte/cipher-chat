const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middlewares
app.use(express.json());

// Routes
const user = require('./routes/user');
app.use("/api/users", user);

mongoose
  .connect(
    "mongodb+srv://Dwyte:rjw2N6pRXkFvbZsC@cs21-2evw6.mongodb.net/CipherChat?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to MongoDB...`))
  .catch(er => console.error(er));

const port = process.env.PORT || 4200;
app.listen(port, () => console.log(`Listening to port ${port}...`));
