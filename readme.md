Part 1: 
#YelpCamp


	-Add landing page
	-Add campgorunds page that lists all campgorunds

	-Campground has:
		*name
		*image
		
	[
		{name: "salmong creek", image: "http://blahblah.com/blahblahblah"}
		{name: "salmong creek", image: "http://blahblah.com/blahblahblah"}
		{name: "salmong creek", image: "http://blahblah.com/blahblahblah"}
		{name: "salmong creek", image: "http://blahblah.com/blahblahblah"}
		...
	]
	
	
Part 2:
#Layout and basic styles

	-Create header and footer partials
	-Add Bootstrap

Part 3:
#Creating new Campgrounds

	-Setup POST route
	-Add body-parser
	-setup route to show form
	-add basic form (unstyled)
	
Part 4:
#Style /campgrounds page

	-Add a better header/title
	-Make CG's display in a grid format via Bootstrap
	
Part 5:
#Style navbar and form(s)

	-Add a navbar to all templates
	-Style the campground form
	
Part 6:
#Add comments Model

	-Add comment model
	-Add seeds.js to give us test data and comments each time we run the app
	-display comments on show.ejs
	
Part 7:
#Comments New/Create

	-Add comment new and create (POST) routes
	-Add new comment form and link it all up
	
Part 8: 
#Style show page

	-Add sidebar
	-Display comments in Bootstrap format
	
Part 9:
#Add authintication

	-Add authentication functionality
	-Show/hide links in navbar based on sign in or not
	
Part 10:
#Refactor

	-Refactor'd routes into /routes/...js files to clean up app.js
	-Used express router to reorganize and cleanup
	
Part 11:
#Users + comments

	-Associate users with comments (remove manual author entry)
	-Save author automatically
	-Add time posted
	
Part 12:
#Editing Functionality

	-Add method-override
	-add edit route for campgrounds
	-Add link to edit page
	-Add update route
	
Part 13:
#Adding delete functionality to campgrounds

	-Add destroy route
	-Add delete button
	
Part 14:
#Authorization

	-User can only edit thier campgrounds
	-User can only delete their campgrounds
	-Hide/show edit/delete buttons