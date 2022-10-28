const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const UserController = require("./controllers/UserController");
const DialogController = require("./controllers/DialogController");
const MessageController = require("./controllers/MessageController");

const port = 3001;
const app = express();
app.use(bodyParser.json());

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
});

app.post("/user/create", User.create);
app.get("/user", User.showUsers);
app.get("/user/:id", User.index);
app.delete("/user/:id", User.delete);

app.post("/dialog/create", Dialog.create);
app.get("/dialog/:id", Dialog.index);
app.get("/dialog", Dialog.showDialogs);
app.delete("/dialog/delete/:id", Dialog.delete);

app.post("/message/create", Message.create);
app.get("/message/:id", Message.index);
app.get("/message", Message.showMessages);
app.delete("/message/:id", Message.delete);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
