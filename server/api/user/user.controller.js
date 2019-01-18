const User = require("./user.model");
const { authenticate, signToken } = require("../auth/auth.service");

// Creates a User
exports.create = (req, res) => {
  User.create(req.body)
    .then(user => {
      res.json(user._id);
    })
    .catch(err => {
      res.status(422).json({ message: "Something went wrong." });
    });
};

// Checks an Email
exports.exists = (req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => {
      if (user) res.status(403).json({ message: "User Already Exists." });
      else res.json({ valid: true });
    })
    .catch(err => {
      res.status(403).json({ message: "Something went wrong." });
    });
};

// User Authentication
exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user)
      return res.status(404).json({ message: "This email is not registered." });
    if (!authenticate(req.body.password, user.password))
      return res.status(403).json({ message: "This password is not correct." });
    let token = signToken(user._id);
    res.json(token);
  });
};
