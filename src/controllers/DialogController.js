const DialogModel = require("../models/Dialog");
const MessageModel = require("../models/Message");

class DialogController {
  create(req, res) {
    const { partner, author, lastMessage } = req.body;

    const dialog = new DialogModel({
      author: author,
      partner: partner,
      lastMessage: lastMessage,
    });

    dialog
      .save()
      .then((dialogData) => {
        const message = new MessageModel({
          text: req.body.text,
          user: req.body.author,
          dialog: dialogData._id,
        });

        message.save().then(() => {
          res.json(dialogData);
        });
      })
      .catch((reason) => res.json(reason));
  }

  index(req, res) {
    const id = req.params.id;

    DialogModel.findById(id)
      .populate(["author", "partner"])
      .exec((err, dialogs) => {
        if (err) {
          return res.status(404).json({
            message: "Dialog Not Found",
          });
        }

        return res.json(dialogs);
      });
  }

  delete(req, res) {
    DialogModel.deleteOne({
      _id: req.params.id,
    })
      .then(() => {
        res.json({
          message: `Dialog deleted`,
        });
      })
      .catch(() =>
        res.status(404).json({
          message: "Dialog not found",
        }),
      );
  }

  showDialogs(req, res) {
    DialogModel.find()
      .then((dialogs) => {
        res.json(dialogs);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = DialogController;
