const express = require("express");
const { userLoggedin, ensureGuest } = require("../middleware/auth");

const router = express.Router();

//* @desc login/loading page
//* @route  GET /

router.get("/", ensureGuest, (req, res) => {
	res.render("login", { layout: "login" });
});

//* @desc /dashboard
//* @route  GET /

router.get("/dashboard", userLoggedin, (req, res) => {
	res.render("dashboard", { name: req.user.displayName });
});

//* @desc Logout User
// @ * router /auth/Logout

router.get("/auth/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
