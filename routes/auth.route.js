const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require("../config/config");

/* 
  @route POST api/auth/register
  @desc register user
  @access public
*/
router.post("/register", async (req, res) => {
  let { firstname, lastname, username, email, password } = req.body;
  try {
    let user = new User({ firstname, lastname, username, email });

    // hash password before saving
    let hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000000000 },
      (err, token) => {
        if (err) throw err; // if error go to catch

        res
          .status(200)
          .json({ token, message: "User registered successfully!" });
      }
    );
  } catch (error) {
    // 500 internal server error
    res.status(500).json({ message: "User not registered sucessfully!" });
  }
});

/* 
  @route POST api/auth/login
  @desc login user
  @access public
*/
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    // search db for user with email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password not matched!" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 36000000000 },
      (err, token) => {
        if (err) throw err; // if error go to catch

        res.status(200).json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Not sure what happened!" });
  }
});

router.get("/user", checkToken, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, "-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong!",
    });
  }
});

module.exports = router;
