require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

/**
 * Middlewares
 */
const corsOptions = {
  origin: [
    process.env.FRONT_END_URL,
    process.env.FRONT_END_URL_HTTP,
    "https://freely--app.herokuapp.com",
    "https://maker.ifttt.com",
    "https://freely.cool",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Test to see if user is logged In before getting into any router.
app.use(function (req, res, next) {
  // console.log(req.session.currentUser);
  next();
});

/**
 * Routes
 */

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const collabsRouter = require("./routes/collabs");
const skillsRouter = require("./routes/skills");
const categoriesRouter = require("./routes/categories");
const messagesRouter = require("./routes/messages");
// Sam is dumb 👇
// const users_usernameRouter = require("./routes/users_username");

// app.use('/', indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/collabs", collabsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/messages", messagesRouter);
// Sam is dumb 👇
// app.use("/", users_usernameRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client_shark-attack/build/index.html'));
// });

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
