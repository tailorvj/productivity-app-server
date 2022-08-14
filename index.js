const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const ActivityRouter = require("./routes/activity.route");

const app = express();

/* Loading the environment variables from the .env file. */
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

/* Allowing the frontend to access the backend. */
app.use(cors());

/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
// app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Please use api as the base for your endpoints");
});

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", ActivityRouter);

/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongo: ", mongoose.connection.readyState);
    app.listen(PORT, console.log("Server stated on port", PORT));
  })
  .catch((err) => {
    console.log(err);
  });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
