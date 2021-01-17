const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

const PORT = 4000;
const DB_NAME = "jobApplication"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

//Passport middlware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/users", UserRouter);

app.listen(PORT, function() {
    console.log("Server up and running on Port: " + PORT);
});
