const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const passport = require("passport");

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    },

    isUnauthenticated: (req, res, next) => {
        if (req.isUnauthenticated()) {
            return next();
        }
        res.redirect("/");
    },

    getIndex: asyncHandler(async (req, res) => {
        const messages = await db.readMessages();
        const { admin } = req.user;
        res.render("index", { messages, admin });
    }),

    getSignUp: (req, res) => {
        res.render("signup");
    },

    postSignUp: asyncHandler(async (req, res) => {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                throw new Error("Hash Error");
            }
            await db.createUser(req.body.username, hash);
            res.redirect("/login");
        });
    }),

    getLogin: (req, res) => {
        res.render("login");
    },

    postLogin: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }),

    getLogout: (req, res, next) => {
        req.logout(err => {
            if (err) {
                return next(err);
            }
            res.redirect("/login");
        });
    },

    getCreate: (req, res) => {
        res.render("create");
    },
    
    postCreate: asyncHandler(async (req, res) => {
        await db.createMessage(req.user.id, req.body.text);
        res.redirect("/");
    }),

    postDelete: asyncHandler(async (req, res) => {
        await db.deleteMessage(req.params.id);
        res.redirect("/");
    })
};