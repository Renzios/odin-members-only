require("dotenv").config();

const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const indexRouter = require("./routes/indexRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new (require('connect-pg-simple')(session))({
        createTableIfMissing: true
    }),
}));

require("./config/passport");

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

app.listen(process.env.PORT || 3000);