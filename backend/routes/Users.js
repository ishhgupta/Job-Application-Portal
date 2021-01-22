const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load applicant model
const applicant = require("../models/applicants");
const recruiter = require("../models/recruiters");

//Load Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route POST /users/register
// @desc Register user
// @access Public
router.post("/register", function (req, res) {
  //Form Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json( errors );
  }

  applicant.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "Email already Exists as Applicant" });
    }
  });
  recruiter.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "Email already Exists as Recruiter" });
    }
  });
  var newUser;
  if (req.body.userType === "recruiter") {
    newUser = new recruiter({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType
    });
  } else {
    newUser = new applicant({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType
    });
  }

  //Hash password before saving in database
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    });
  });
});

// @route POST /users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  applicant.findOne({ email }).then((user) => {
    // Checking if applicant exists
    if (user) {
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // applicant matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType
          };
          // Sign token
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user : user
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ error: "Password incorrect", passwordincorrect: "Password incorrect" });
        }
      });
    } else {
      recruiter.findOne({ email }).then((user) => {
        //checking if recruiter exists
        if (!user) {
          return res.status(404).json({ error: "Email not found" , emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            // applicant matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              userType: user.userType
            };
            // Sign token
            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  user: user
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ error: "Password incorrect", passwordincorrect: "Password incorrect" });
          }
        });
      });
    }
  });
});

// GET request
// Getting all the users
// router.get("/", function (req, res) {
//   applicant.find(function (err, users) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(users);
//     }
//   });
// });

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db

module.exports = router;
