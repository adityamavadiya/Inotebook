const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../midddleware/fetchUser");
const JWT_SECRET = "aadddiii@1112";
// createUser
router.post(
  "/createuser",
  [
    body("name", "Name must be of atleast 3 characters.").isLength({ min: 5 }),
    body("email", "Email must be valid").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    console.log("hello");
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success, errors: result.array() });
    }
    console.log(req.body);
    // find if user already exists
    // let user1 = await User.findOne({ email: req.body.email });
    // if (user1) {
    //   res.status(400).json({ error: "Sorry, user already exists!" });
    // }

    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(req.body.password, salt);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
      .then((user) => {
        const data = {
          id: user.id,
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        res.json({ success: true, authToken });
      })
      .catch((err) => res.json({ success: false, errors: err }));
  }
);

// authenticate
router.post(
  "/login",
  [
    body("email", "Email must be valid.").isEmail(),
    body("password", "Password can't be empty.").exists(),
  ],
  async (req, res) => {
    console.log("hello");
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    console.log(req.body);
    // find if user already exists
    // let user1 = await User.findOne({ email: req.body.email });
    // if (user1) {
    //   res.status(400).json({ error: "Sorry, user already exists!" });
    // }

    const { email, password } = req.body;
    try {
      let success = false;
      let user = await User.findOne({ email: email });
      if (!user) {
        res.status(400).json({ success, error: "Email doesn't exist!" });
      }

      const passwordCompare = bcryptjs.compare(password, user.password);
      if (!password) {
        return res.status(400).json({ success, error: "Invalid credentials!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log("here!");
      res.json({ success, authtoken });
    } catch (err) {
      console.log(err);
      res.status(500).send("Some error occured!");
    }
  }
);

// getUser
router.get("/getuser", fetchuser, async (req, res) => {
  console.log("hello there!");
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ user });
  } catch (err) {
    console.log("err : ", err);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");

// Create a user using POST "/api/auth", doesn't require authentication
// router.post(
//   "/createuser",
//   [
//     body("name", "Enter a valid name").isLength({ min: 3 }),
//     body("email", "Enter a valid Email").isEmail(),
//     body("password", "Password must have a minimum of 5 characters").isLength({
//       min: 5,
//     }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
// // find if user already exists
// let user1 = User.findOne({ email: req.body.email });
// if (user1) {
//   res.status(400).json({ error: "Sorry, user already exists!" });
// }
//       // create a new user
//       const user = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       });
//       res.json(user);
//     } catch (error) {
//       if (error.code === 11000) {
//         // Duplicate key error
//         return res.status(400).json({ error: "Email already exists" });
//       }
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   }
// );

// module.exports = router;
