require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const morgan = require("morgan");
const exphbs = require("express-handlebars");

const app = express();

connectDB();
require("./models/User");
// Use Passport
require("./config/passport")(passport);

app.use(morgan("dev"));

//handlebars
app.engine(
	".hbs",
	exphbs({
		defaultLayout: "main",
		extname: ".hbs",
		partialsDir: [
			//  path to your partials
			path.join(__dirname, "views/layouts/partials"),
		],
	})
);
app.set("view engine", ".hbs");

//Passport middleware

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

app.use(passport.initialize());
app.use(passport.session());
// Static Folders
app.use(express.static(path.join(__dirname, "public")));

// Session midleware

//Route

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`we are listening to port ${PORT} 👀 ...`));
