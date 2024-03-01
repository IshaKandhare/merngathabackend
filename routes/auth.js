//routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "ElespaHEVElectrifyingIndiawemadehybridvehicles";

const emailValidator = (email) => {
  // Regular expression for a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

router.post(
  "/createUser",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .bail() // Stops running validations if previous ones have failed
      .custom((value) => {
       
        if (!emailValidator(value)) {
          throw new Error("Invalid email address");
        }
        return true;
      }),
    body("username").isLength({ min: 5 }),
    body("password", "Incorrect Password!!").isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
  

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secpassword,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password!!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with valid credentials" });
      }
      const pwdcompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdcompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with valid credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authtoken = jwt.sign(data, jwtsecret);
      return res.json({ success: true, authtoken: authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;