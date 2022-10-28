const MessageModel = require("../models/Message");

class MessageController {
  create(req, res) {
    const { text, dialogId, user } = req.body;

    const message = new MessageModel({
      text: text,
      user: user,
      dialog: dialogId,
    });

    message
      .save()
      .then((obj) => {
        res.json(obj);
      })
      .catch((reason) => res.json(reason));
  }

  index(req, res) {
    const dialogId = req.query.dialog;

    MessageModel.find({ dialog: dialogId })
      .populate(["dialog"])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            message: "Messages Not Found",
          });
        }

        return res.json(messages);
      });
  }

  showMessages(req, res) {
    MessageModel.find()
      .then((messages) => {
        res.json(messages);
      })
      .catch((err) => console.log(err));
  }

  delete(req, res) {
    MessageModel.deleteOne({
      _id: req.params.id,
    })
      .then(() => {
        res.json({
          message: `Message deleted`,
        });
      })
      .catch(() =>
        res.status(404).json({
          message: "Message not found",
        }),
      );
  }
}

module.exports = MessageController;
