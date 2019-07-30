var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {
	useNewUrlParser: true,
	useCreateIndex: true,
}).then(() => {
	console.log('Connected to DB');
}).catch(err => {
	console.log('ERROR connecting to database: ', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name: "Granite Hill", image: "https://www.nps.gov/arch/planyourvisit/images/delicate3.jpg?maxwidth=650&autorotate=false", description: "This place sucks and smells like shite"}, (err, campground) => {
// 	if(err){
// 		console.log(err,campground);
// 	} else {
// 		console.log("New campground: ");
// 		console.log(campground);
// 	}
// });

//Landing Page
app.get("/", (req,res) => {
	res.render("landing.ejs");
});


//REST API \/ \/ \/ -------------------------------------------------

//INDEX - show all CG's
app.get("/campgrounds", (req,res) => {
	//get all CG's from DB
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
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

//NEW - show form to create new CG
app.get("/campgrounds/new", (req,res) => {
	res.render("new.ejs");
});

//SHOW - shows more info on campgrounds
app.get("/campgrounds/:id", (req,res) => {
	//find CG with provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

//REST API /\ /\ /\ -------------------------------------------------

app.listen(3000, ()=> {
	console.log("YelpCamp listening on Port 3000");
});