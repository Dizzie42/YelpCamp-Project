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
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name: "Granite Hill", image: "https://www.nps.gov/arch/planyourvisit/images/delicate3.jpg?maxwidth=650&autorotate=false"}, (err, campground) => {
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

//Campgrounds
app.get("/campgrounds", (req,res) => {
	//get all CG's from DB
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds",{campgrounds:allCampgrounds});
		}
	});
});

//REST
app.post("/campgrounds", (req,res) => {
	//get data and add to array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	//Create new CG and save to DB
	Campground.create(newCampground, (err, newCg) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", (req,res) => {
	res.render("new.ejs");
});


app.listen(3000, ()=> {
	console.log("YelpCamp listening on Port 3000");
});