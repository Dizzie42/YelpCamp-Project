var Campground = require("../models/campground");
var Comment = require("../models/comment");
//All middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else {
			//does user own campground?
			if(foundCampground.author.id.equals(req.user._id)) {				//if user owns campground
				next();
			} else {
				req.flash("error", "You do not have permission to do that");
				res.redirect("back");
			}
		}
	});
	} else {
		req.flash("error", "You must be logged in to do that");
		res.redirect("back");
	}
};	

middlewareObj.checkCommentsOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
			res.redirect("back");
		} else {
			//does user own comment?
			if(foundComment.author.id.equals(req.user._id)) {				//if user owns campground
				next();
			} else {
				req.flash("error", "You do not have permission to do that");
				res.redirect("back");
			}
		}
	});
	} else {
		req.flash("error", "You must be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.session.returnTo = req.originalUrl;
	req.flash("error", "You must be logged in to do that");
	res.redirect("/login");
};

module.exports = middlewareObj;