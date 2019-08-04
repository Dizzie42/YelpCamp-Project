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

//seedDB();				//Used to purge database of data and add 12 example campgrounds *Without comments*

//Rendering Routes
var commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes 		= require("./routes/index");


//DB Connect
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
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

//app.use routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//start up server locally at https://class-setup.run.goorm.io/
app.listen(3000, ()=> {
	console.log("YelpCamp listening on Port 3000");
});