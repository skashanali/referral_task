const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config");

// Returns a jwt token signed with user id
exports.signToken = id => {
  return jwt.sign({ id }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
};

// Authenticate user given password
exports.authenticate = (pwd, dbPwd) => {
  return bcrypt.compareSync(pwd, dbPwd);
};
