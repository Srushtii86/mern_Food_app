const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
 
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameIsGoFoodMernApplicationAndThisIsSecretString";//Any string can be passed this becomes your VerifySignature

//JWT Token is generated as header.payload.secret

router.post(
  "/CreateUser",
  [
    body("name", "Invalid Name").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Invalid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
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

router.post(
  "/LoginUser", async (req, res) => {
    try {
      let userData = await User.findOne( {email: req.body.email} );
      if (!userData) {
        return res.status(400).json({ errors: "Enter valid Credentials(Email)" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password , userData.password);

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Enter valid Credentials(Password)" });
      }

      const data = {
        user : {
          id : userData.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({ success: true , authToken : authToken });
    } 
    catch (error) {
      console.log(error);
      res.json({ success: false });
    }

  }
);

module.exports = router;
