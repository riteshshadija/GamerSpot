var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res) {
	res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
	res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username, password: req.body.password});
	User.register(newUser, req.body.password, function(err, user) {
		if(err){
			 return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to GamerSpot "+ user.username);
			res.redirect("/games");
		});
	});
});

// show login form
router.get("/login", function(req, res) {
	res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local", 
	{
		successRedirect: "/games",
		failureRedirect: "/login"
	}), function (req, res) {
});

// logout route
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "LOGGED YOU OUT!!");
	res.redirect("/games");
});


module.exports = router;
