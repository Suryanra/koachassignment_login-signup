const { model, connect } = require("../connect");

const bcrypt = require("bcrypt");
const signup = async (req, resp) => {
  const { username, email, password } = req.body;
  const arr = await model.findOne({ username: username });
  if (arr && arr.length !== 0) {
    resp.status(409).send({ message: "username already present" });
  } else {
    const { password: userpassword } = req.body;
    bcrypt.hash(userpassword, 8, async function (err, hashedPassword) {
      if (!err) {
        const newUser = new model({
          username:username,
          password: hashedPassword,
        });

        const userData = await newUser.save();
        resp.status(201).send({message:"account created successfully"})
      }
      else {
        resp.status(500).send({ message: "internal server error" });
        return;
      }
    });
  }
};

exports.signup = signup;
