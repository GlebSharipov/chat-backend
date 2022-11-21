const UserModel = require("../models/User");
const createJWTToken = require("../utils/createJWTToken");
const bcrypt = require("bcrypt");

module.exports = class UserController {
  async register(req, res) {
    const { email, userName, password } = req.body;

    const oldUser = await UserModel.findOne({ email: email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const token = createJWTToken(email);
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      email: email,
      userName: userName,
      password: encryptedPassword,
    });

    user.token = token;

    user
      .save()
      .then((obj) => {
        res.send(obj);
      })
      .catch((err) => res.json(err));
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await UserModel.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
        if (!user.token) {
          const token = createJWTToken(email);
          user.token = token;
        }

        res.status(200).json(user);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  }

  showUsers(req, res) {
    UserModel.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => console.log(err));
  }

  delete(req, res) {
    UserModel.deleteOne({
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
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "Not Found",
        });
      }
      res.json(user);
    });
  }
};
