var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Hikes = require("./models/hikes");
var Comments = require("./models/comment");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/explore_hikes");




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikingspots", function(req, res) {
    //get all hikes from db
    Hikes.find({}, function(err, allHikes) {
        if (err) {
            console.log(err);
        } else {
            res.render("hikes/index", {hikes: allHikes});
        }
    })
});

//create - add new hike to db
app.post("/hikingspots", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newHike = {name: name, image: image, description: desc};
    
    // create new hike and save to DB
    Hikes.create(newHike, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            //redirect back to hiking spots page
            res.redirect("/hikingspots");
        }
    })

});

//new - show form to create new hike
app.get("/hikingspots/new", function(req, res) {
    res.render("hikes/new");
})

//show - show info about one hike
app.get("/hikingspots/:id", function(req, res) {
    //find hike w/ provided id
    //render show template w/ that hike
    Hikes.findById(req.params.id).populate("comments").exec(function(err, foundHike) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundHike);
            res.render("hikes/show", {hike: foundHike});
        }
    });
})


//***COMMENTS Routes
app.get("/hikingspots/:id/comments/new", function(req, res) {
    Hikes.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {hike: hike});
        }
    });
})

app.post("/hikingspots/:id/comments", function(req, res) {
    //find hike by id
    Hikes.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
            res.redirect("/hikingspots");
        } else {
            Comments.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    hike.comments.push(comment);
                    hike.save();
                    res.redirect("/hikingspots/" + hike._id);
                }
            })
        }
    })
    //create comment in db
    //connect new comment to hike
    //redirect back to show page
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Explore Hikes has started!");
})