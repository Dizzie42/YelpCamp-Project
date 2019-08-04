var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//INDEX - show all Campgrounds
router.get("/", (req,res) => {
	//Get all CG's from DB
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

//NEW - show form to create new Campground
router.get("/new", isLoggedIn, (req,res) => {
	res.render("campgrounds/new");
});

//CREATE - add new Campground to database
router.post("/", (req,res) => {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = req.body.author;
	var newCampground = {name: name, image: image, description: desc, author: author};
	Campground.create(newCampground, (err, newCg) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds/"+newCg._id);
		}
	});
});

//SHOW - shows more info on campgrounds
router.get("/:id", (req,res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
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