const Referral = require("./referral.model");

function generateCode(first_name, last_name) {
  let code =
    first_name.replace(/\s/g, "").toLowerCase() +
    "_" +
    last_name.replace(/\s/g, "").toLowerCase() +
    "_" +
    Math.floor(Math.random() * 10000000 + 1);
  return code;
}

// Creates a Referral
exports.create = (req, res) => {
  const { first_name, last_name, _id } = req.body;
  const referral = {
    code: generateCode(first_name, last_name),
    userId: _id
  };
  Referral.create(referral)
    .then(result => {
      res.json(result.code);
    })
    .catch(err => {
      res.status(422).json({ message: "Something went wrong." });
    });
};

// Checks a Referral Code
exports.check = (req, res) => {
  Referral.findOne({ code: req.params.code })
    .then(referral => {
      if (!referral)
        res.status(403).json({ message: "Invalid Referral Code." });
      else res.json({ valid: true });
    })
    .catch(err => {
      res.status(403).json({ message: "Something went wrong." });
    });
};

// Update a Referral by Id
exports.update = (req, res) => {
  Referral.updateOne(
    { code: req.params.code },
    { $push: { users: req.body.userId } }
  )
    .then(modified => {
      res.json({ message: `Successfully updated` });
    })
    .catch(err => {
      res.status(422).json({ message: err.errors[0].message });
    });
};
