// needed packages Import
const mongoose = require("mongoose");
const { Schema } = mongoose;

// user schema

const userSchema = new Schema(
  {
    status :{type :Number , default :0},
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    addedsurveys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sondages" }],
    votedsurveys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Votes" }],
  },
    
  { versionKey: false, timestamps: true }
);
// create the user model
const User = mongoose.model("Users", userSchema);

module.exports = User;
