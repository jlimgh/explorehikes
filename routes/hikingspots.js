var express = require("express");
var router = express.Router();
var Hikes = require("../models/hikes");

//Index page- shows all hikes
router.get("/", function(req, res) {
    //get all hikes from db
    Hikes.find({}, function(err, allHikes) {
        if (err) {
            console.log(err);
        } else {
            res.render("hikes/index", {hikes: allHikes});
        }
    });
});

//Create - add new hike to db
router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newHike = {name: name, image: image, description: desc, author: author};
    
    // create new hike and save to DB
    Hikes.create(newHike, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            //redirect back to hiking spots page
            res.redirect("/hikingspots");
        }
    });

});

//New - show form to create new hike
router.get("/new", isLoggedIn, function(req, res) {
    res.render("hikes/new");
});

//Show - show info about one hike
router.get("/:id", function(req, res) {
    //find hike w/ provided id
    //render show template w/ that hike
    Hikes.findById(req.params.id).populate("comments").exec(function(err, foundHike) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundHike);
            res.render("hikes/show", {hike: foundHike});
        }
    });
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;