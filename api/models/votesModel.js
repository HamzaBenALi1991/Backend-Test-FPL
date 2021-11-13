// needed packages Import
const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema

const VotesSchema = new Schema(
  {
    vote : {type : String , required : true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    survey : {type: mongoose.Schema.Types.ObjectId, ref: "Sondages"}
  },
  { versionKey: false, timestamps: true }
);
// create the user model
const Votes = mongoose.model("Votes", VotesSchema);

module.exports = Votes;
