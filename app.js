var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");
	User = require("./models/user");
	seedDB = require("./seeds");

//seedDB();

mongoose.connect("mongodb+srv://devsprout:1234@udemy-project-hpcze.mongodb.net/YelpCamp?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
}).then(() => {
	console.log('Connected to DB');
}).catch(err => {
	console.log('ERROR connecting to database: ', err.message);
});

//Passsport config
app.use(require("express-session")({
	secret: "Cutest Dog",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



//Landing Page
app.get("/", (req,res) => {
	res.render("landing");
});


//REST API \/ \/ \/ -------------------------------------------------

//INDEX - show all CG's
app.get("/campgrounds", (req,res) => {
	//get all CG's from DB
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

//NEW - show form to create new CG
app.get("/campgrounds/new", (req,res) => {
	res.render("campgrounds/new");
});

//CREATE - add new CG to database
app.post("/campgrounds", (req,res) => {
	//get data and add to array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create new CG and save to DB
	Campground.create(newCampground, (err, newCg) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});


//SHOW - shows more info on campgrounds
app.get("/campgrounds/:id", (req,res) => {
	//find CG with provided ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//==============================
//Comments Routes
//==============================

//NEW - Show form for new comments
app.get("/campgrounds/:id/comments/new", (req,res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", (req,res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else { 
			Comment.create(req.body.comment, (err,comment) => {
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+ campground._id);
				}
			});
		}
	});
});
//REST API /\ /\ /\ -------------------------------------------------

//AUTH Routes
app.get("/register", (req,res) => {
	res.render("register");
});
//Sign up logic
app.post("/register", (req,res) => {
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

app.listen(3000, ()=> {
	console.log("YelpCamp listening on Port 3000");
});