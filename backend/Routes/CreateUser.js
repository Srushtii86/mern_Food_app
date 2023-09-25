const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
router.post(
  "/CreateUser",
  [
    body("name", "Invalid Name").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    console.log("Hello5655");
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });
      console.log("Data Saved Successfully");
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
