const User = require("../schemas/User");

class UserController {
  create(req, res) {
    const { email, userName, password } = req.body;

    const user = new User({
      email: email,
      userName: userName,
      password: password,
    });

    user
      .save()
      .then((obj) => {
        res.send(obj);
      })
      .catch((reason) => res.json(reason));
  }

  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => console.log(err));
  }

  deleteUser(req, res) {
    User.remove({
      _id: req.params.id,
    })
      .then(() => {
        res.json({
          message: `User deleted`,
        });
      })
      .catch(() =>
        res.status(404).json({
          message: "User not found",
        }),
      );
  }

  index(req, res) {
    const id = req.params.id;
    User.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "Not Found",
        });
      }
      res.json(user);
    });
  }
}

module.exports = UserController;
