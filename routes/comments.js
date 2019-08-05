var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//Comments Show - Show form for new comments
router.get("/new", isLoggedIn, (req,res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//Comments create
router.post("/", isLoggedIn, (req,res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else { 
			Comment.create(req.body.comment, (err,comment) => {
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+ campground._id);
				}
			});
		}
	});
});

//Comments EDIT route
router.get("/:comment_id/edit", checkCommentsOwnership, (req,res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
		res.redirect("back");
	} else {
		res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	}
	});
});

//Comments UPDATE route
router.put("/:comment_id", checkCommentsOwnership, (req,res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updated) => {
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//Comments DESTROY route
router.delete("/:comment_id", checkCommentsOwnership, (req,res) => {
	Comment.findByIdAndRemove(req.params.comment_id, (err) => {
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/"+req.params.id);
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

function checkCommentsOwnership(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
			res.redirect("back");
		} else {
			//does user own comment?
			if(foundComment.author.id.equals(req.user._id)) {				//if user owns campground
				next();
			} else {
				res.redirect("back");
			}
		}
	});
	} else {
		res.redirect("back");
	}
}
 

module.exports = router;