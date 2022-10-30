const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const UserModel = require("./models/User");
const UserController = require("./controllers/UserController");
const DialogController = require("./controllers/DialogController");
const MessageController = require("./controllers/MessageController");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: "635e47c80c6a7aa6799cf139" },
    {
      last_seen: new Date(),
    },
    { new: true },
    () => {},
  );
  next();
});

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

mongoose.connect(process.env.MONGO_DB, {
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

app.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT} `);
});
