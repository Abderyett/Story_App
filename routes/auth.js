const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc authenticate with google
// @GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc Google auth Callback
// @GET /auth/google/callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect("/dashboard");
	}
);
// @desc authenticate with Facebook
// @GET /auth/facebook
router.get(
	"/facebook",
	passport.authenticate("facebook", {
		scope: "email",
	})
);
// @desc Facebook auth Callback
// @GET /auth/facebook/callback

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
	})
);

module.exports = router;
