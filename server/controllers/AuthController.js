const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// SIGNUP CONTROLLER
exports.postSignUp = [
  check('first_name')
    .notEmpty().withMessage('First name is required')
    .trim()
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters')
    .matches(/^[a-zA-Z]+$/).withMessage('First name must contain only letters'),

  check('last_name')
    .optional()
    .trim()
    .matches(/^[a-zA-Z]*$/).withMessage('Last name can only contain letters'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/.*[A-Z].*/).withMessage('Password must contain an uppercase letter')
    .matches(/.*[a-z].*/).withMessage('Password must contain a lowercase letter')
    .matches(/.*\d.*/).withMessage('Password must contain a number')
    .matches(/.*[!@#$%^&*(),.?":{}|<>].*/).withMessage('Password must contain a special character'),

  check('confirmpassword')
    .notEmpty().withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check('userType')
    .notEmpty().withMessage('Please select a user type')
    .isIn(['host', 'guest']).withMessage('Invalid user type'),


  check('terms')
    .custom((value) => value === true)
    .withMessage('You must accept the terms and conditions'),

  async (req, res) => {
    try {
      const { first_name, last_name, email, password, userType } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, msg: "Validation failed", errors: errors.array() });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ success: false, msg: "Email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ first_name, last_name, email, password: hashedPassword, userType });
      await user.save();

      return res.status(201).json({ success: true, msg: "Signup successful! Please login." });
    } catch (err) {
      console.error("Error in signup:", err);
      return res.status(500).json({ success: false, msg: "Server error" });
    }
  }
];

//  LOGIN
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ success: false, msg: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ success: false, msg: "Invalid password" });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();

    return res.json({ success: true, msg: "Login successful", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

// ✅ LOGOUT
exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, msg: "Logged out" });
  });
};

// ✅ RESET PASSWORD
exports.postResetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, msg: "Passwords do not match" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 8 chars, include uppercase, lowercase, number, and special character",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    return res.json({ success: true, msg: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
