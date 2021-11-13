const express = require("express");
const router = express.Router();
const Surveys = require("../models/suerveyModel");
const passport = require("passport");
const path = require("path");

// get
router.get(
  "/Surveys",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const surveys = await Surveys.find({}).populate('user');
      res.status(200).json(surveys);
    } catch (error) {
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);
// create
router.post(
  "/newSurvey",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const survey = await Surveys.create(req.body);
      res.status(200).json(survey);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);
// delete
router.delete(
  "/Survey/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const survey = await Surveys.findById(req.params.id);
      if (survey) {
        await Surveys.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: "survey has been Deleted . ",
        });
      } else {
        res.status(403).json({
          message: "this ID Survey does not exist ",
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
  "/Survey/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const survey = await Surveys.findById(req.params.id).populate("user votes");
      if (survey) {
        res.status(200).json(survey);
      } else {
        res.status(403).json({
          message: "this id survey does not exist .",
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
  "/Survey/:id",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const survey = await Surveys.findById(req.params.id);
      if (survey) {
        const survey = await Surveys.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        res.status(200).json(survey);
      } else {
      }
    } catch (error) {
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  }
);

module.exports = router;
