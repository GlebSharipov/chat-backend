const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const User = require("./schemas/User");
const UserController = require("./controllers/UserController");

const Controller = new UserController();
const port = 3001;
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
});

app.post("/user/registration", Controller.create);
app.get("/user", Controller.getUsers);
app.get("/user/:id", Controller.index);
app.delete("/user/:id", Controller.deleteUser);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
