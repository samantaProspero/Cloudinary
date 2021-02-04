const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Route
app.use('/user', require('./routes/user'))

"scripts": {
  "start": "node dist/src/server.js",
  "dev": "tsnd --transpile-only --ignore-watch node_modules --files --respawn src/server.ts",