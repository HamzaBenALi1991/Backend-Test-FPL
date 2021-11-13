const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
// needed for removing file after update
const fs = require("fs");
// for hashing password
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const passport = require("passport");

// get
router.get(
  "/users",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const users = await Users.find({});
      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);
// create
router.post("/newuser", async (req, res) => {
  try {
    const exist = await Users.find({ email: req.body.email });
    if (exist.length > 0) {
      res.status(403).json({
        message: "this email already exist . ",
      });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = await Users.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({
      message: "Inernal Error ",
    });
  }
});
// delete
router.delete(
  "/user/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (user) {
        await Users.findByIdAndRemove(req.params.id);
        res.status(200).json({
          message: "user has been deleted",
        });
      } else {
        res.status(404).json({
          error: "User with this Id does not exist ",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);
// get by Id
router.get(
  "/user/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).populate();
      if (user) {
        // checking if the Id is valid
        res.status(200).json(user);
      } else {
        // response if the Id is not valid
        res.status(404).json({
          message: "there is no user with this ID",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);
// update
router.put(
  "/user/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {

      const user = await Users.findById(req.params.id);
      if (user) {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json(user);
      } else {
        res.status(404).json({
          error: "this user does not exist ",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      // check password if correct
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        const tokenData = {
          // add as many needed informations
          email: user.email,
          Id: user._id,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        res.status(200).json({
          message: "Login Succeded . ",
          token: token,
          _Id: user._id,
        });
      } else {
        res.status(403).json({
          message: "Please make sure the email and password are correct .",
        });
      }
    } else {
      res.status(403).json({
        message: "Please make sure the email and password are correct .",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
