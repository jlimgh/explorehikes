var express = require("express");
var router = express.Router({mergeParams: true});
var Hikes = require("../models/hikes");
var Comments = require("../models/comment");

//Comments new
router.get("/new", isLoggedIn, function(req, res) {
    Hikes.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {hike: hike});
        }
    });
});

//Comments create
router.post("/", isLoggedIn, function(req, res) {
    Hikes.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
            res.redirect("/hikingspots");
        } else {
            Comments.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log("comment object", comment);
                    //save
                    comment.save();
                    hike.comments.push(comment);
                    hike.save();
                    console.log("comment object", comment);
                    res.redirect("/hikingspots/" + hike._id);
                }
            });
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