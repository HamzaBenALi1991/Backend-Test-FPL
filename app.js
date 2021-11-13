// imprort app requirements
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require('cors'); 
const mongoose = require('mongoose')
const passport = require('passport')
// bearer strategie  with passport
require("./passport/BearerStrategie");
// dotenv config
require("dotenv").config();

// importing routes
const UserRoutes = require("./api/routes/userRoutes");
const sondageRoutes = require("./api/routes/sondageRoutes");
const votesRoutes  =require('./api/routes/votesRoutes')

// stting up mongoose connect
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  mongoose
    .connect("mongodb://localhost:27017/FPL", options)
    .then((connect) => {
      console.log("=> Connect to database successfully!");
    })
    .catch((error) => {
      console.log("=> Connect to database with errors!");
      console.log(error);
    });

app.use(passport.initialize());
// setting up morgan pachage
app.use(morgan("dev"));
// config bodyparser
app.use(
  express.json({
    extended: true,
  })
);

// CORS handlying
app.use(cors());




// routes that handls requests
app.use("/", UserRoutes);
app.use("/", sondageRoutes);
app.use('/',votesRoutes)
// handlying all wrong routes  :

app.use((req, res, next) => {
  const error = new Error("Not Found !");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
