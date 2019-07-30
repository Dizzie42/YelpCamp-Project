var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//TEMP
var campgrounds = [
	{name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/Bird-banding-evening-grosbeak.jpg?maxwidth=650&autorotate=false"},
	{name: "Granite Hill", image: "https://www.nps.gov/arch/planyourvisit/images/delicate3.jpg?maxwidth=650&autorotate=false"},
	{name: "Mountain Gota's Rest", image: "https://www.hoa.africom.mil/Img/18430/LowRes/combined-joint-task-force-horn-of-africa-image"},
	{name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/Bird-banding-evening-grosbeak.jpg?maxwidth=650&autorotate=false"},
	{name: "Granite Hill", image: "https://www.nps.gov/arch/planyourvisit/images/delicate3.jpg?maxwidth=650&autorotate=false"},
	{name: "Mountain Gota's Rest", image: "https://www.hoa.africom.mil/Img/18430/LowRes/combined-joint-task-force-horn-of-africa-image"},
	{name: "Salmon Creek", image: "https://www.nps.gov/lavo/planyourvisit/images/Bird-banding-evening-grosbeak.jpg?maxwidth=650&autorotate=false"},
	{name: "Granite Hill", image: "https://www.nps.gov/arch/planyourvisit/images/delicate3.jpg?maxwidth=650&autorotate=false"},
	{name: "Mountain Gota's Rest", image: "https://www.hoa.africom.mil/Img/18430/LowRes/combined-joint-task-force-horn-of-africa-image"}
];

//Landing Page
app.get("/", (req,res) => {
	res.render("landing.ejs");
});

//Campgrounds
app.get("/campgrounds", (req,res) => {
	res.render("campgrounds", {campgrounds:campgrounds});
});

//REST
app.post("/campgrounds", (req,res) => {
	//get data and add to array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req,res) => {
	res.render("new.ejs");
});


app.listen(3000, ()=> {
	console.log("YelpCamp listening on Port 3000");
});