var express    = require('express'),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	flash	   = require("connect-flash"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Game       = require("./models/game"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seeds");

// requiring routes
var commentRoutes = require("./routes/comments"),
	gameRoutes = require("./routes/games"),
	indexRoutes = require("./routes/index")

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/GamerSpot");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); // seed the database

//require moment
app.locals.moment = require('moment');

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty win",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
	
app.use("/", indexRoutes);
app.use("/games/:id/comments", commentRoutes);
app.use("/games", gameRoutes);

app.listen(5000, function() {
	console.log("The GamerSpot server has started on port 5000");
});
