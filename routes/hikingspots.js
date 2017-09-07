var express = require("express");
var router = express.Router();
var Hikes = require("../models/hikes");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res) {
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

//Edit
router.get("/:id/edit", middleware.checkHikingspotOwnership, function(req, res) {
        Hikes.findById(req.params.id, function(err, foundHike) {
            res.render("hikes/edit", {hike: foundHike});
        });
});

//Update
router.put("/:id", middleware.checkHikingspotOwnership, function(req, res) {
    //find and update correct hiking spot
    Hikes.findByIdAndUpdate(req.params.id, req.body.hike, function(err, updatedHike) {
        if (err) {
            res.redirect("/hikingspots");
        } else {
            res.redirect("/hikingspots/" + req.params.id);
        }
    });
});

//Destroy
router.delete("/:id", middleware.checkHikingspotOwnership, function(req, res) {
    Hikes.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/hikingspots");
        } else {
            res.redirect("/hikingspots");
        }
    })
});


module.exports = router;