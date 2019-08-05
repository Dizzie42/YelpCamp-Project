var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

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
			return res.render("register", {"error":err.message});			//Must send flash message as an object to render, or send flash message and then redirect
		} else {
			passport.authenticate("local")(req, res, () => {
				req.flash("success", "Welcome to YelpCamp " + user.username);
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
		failureFlash: true,
		//successFlash: "Welcome back!"				//If we want a successful login message
	}),(req,res) => {});

//Logout route
router.get("/logout", (req,res) => {
	var url = res;
	req.logout();
	req.flash("success", "Successfully logged out");
	res.redirect("back");
});


module.exports = router;