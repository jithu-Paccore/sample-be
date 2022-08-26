var express = require("express");
var router = express.Router();
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.name,
    phone: req.body.phone,
    age: req.body.age,
    gender: req.body.gender,
  });
  var reqOtp = "1234";
  if (req.body.otp === reqOtp) {
    user = await user.save();
  }

  if (!user) {
    return res.status(400).send("the user cannot be created!");
  } else {
    res.status(200).send(user);
  }

  console.log(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });
  const secret = "I-love-my-dog";
  if (!user) {
    return res.status(400).send("The user not found");
  }

  var reqOtp = "1234";

  if (user && req.body.otp === reqOtp) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user, token: token });
  } else {
    res.status(400).send("otp is wrong!");
  }
});

module.exports = router;
