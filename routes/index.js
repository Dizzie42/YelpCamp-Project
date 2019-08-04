var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//==================
//Landing Page
//==================
router.get("/", (req,res) => {
	res.render("landing");
});


//Register form route
router.get("/register", (req,res) => {
	res.render("register");
});

//Sign up logic
router.post("/register", (req,res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err);
			return res.render("register");
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/campgrounds");
			});
		}
	});
});

//Login form route
router.get("/login", (req, res) => {
	res.render("login");
});
//Handle login form logic
router.post("/login", passport.authenticate("local", 
	{
		successReturnToOrRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true
	}),(req,res) => {});

//Logout route
router.get("/logout", (req,res) => {
	var url = res;
	req.logout();
	res.redirect("/campgrounds");
});

//==================
//Middleware
//==================
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.session.returnTo = req.originalUrl;
	res.redirect("/login");
}

module.exports = router;