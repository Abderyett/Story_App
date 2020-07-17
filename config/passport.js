const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "/auth/google/callback",
			},
			(accessToken, refreshToken, profile, done) => {
				console.log(profile);
				async function creatUser() {
					const findUser = await User.findOne({ googleId: profile.id });
					if (!findUser) {
						const user = await new User({
							googleId: profile.id,
							displayName: profile.displayName,
							givenName: profile.name.givenName,
							lastName: profile.name.familyName,
							image: profile.photos[0].value,
						}).save();
						done(null, user);
					} else {
						done(null, findUser);
					}
				}
				creatUser();
			}
		)
	);
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: "/auth/facebook/callback",
				profileFields: ["id", "emails", "name"],
				enableProof: true,
			},
			function (accessToken, refreshToken, profile, done) {
				console.log(profile);
				async function createUser() {
					const findUser = await User.findOne({
						facebookId: profile.id,
					});
					if (!findUser) {
						const user = await new User({
							facebookId: profile.id,
							givenName: profile.name.givenName,
							lastName: profile.name.familyName,
							email: profile.emails[0].value,
						}).save();
						done(null, user);
					} else {
						done(null, findUser);
					}
				}
				createUser();
			}
		)
	);
	passport.serializeUser((user, done) => done(null, user.id));

	passport.deserializeUser((id, done) =>
		User.findById(id, (err, user) => done(err, user))
	);
};
