const express = require("express");
const router = express.Router();
const Votes= require('../models/votesModel')
const User =require('../models/userModel')
const Survey = require('../models/suerveyModel')
// get
router.get("/votes", async (req, res) => {
  try {
    const votes =await Votes.find({}) 
    res.status(200).json(votes)
  } catch (error) {
    res.status(500).json({
      message: "Inernal Error ",
    });
  }
});
// create  done 
router.post("/vote", async (req, res) => {
    try {
      const vote = await Votes.create(req.body)
        res.status(200).json(vote)
        await User.findByIdAndUpdate(
          req.body.user,
          { $push: { votedsurveys: vote._id } },
          {
            new: true,
          }
        );
        await Survey.findByIdAndUpdate(
          req.body.survey,
          { $push: { votes: vote._id } },
          {
            new: true,
          }
        );
    } catch (error) {
      res.status(500).json({
        message: "Inernal Error ",
      });
    }
  });



module.exports = router
