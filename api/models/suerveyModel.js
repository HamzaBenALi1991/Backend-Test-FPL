// needed packages Import
const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema

const SurveySchema = new Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: true },
    votes : [{ type: mongoose.Schema.Types.ObjectId, ref: "Votes"}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users"},
  },
  { versionKey: false, timestamps: true }
);
// create the user model
const Sondages = mongoose.model("Sondages", SurveySchema);

module.exports = Sondages;
