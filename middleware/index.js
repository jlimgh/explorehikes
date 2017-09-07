//middleware
var Hikes = require("../models/hikes");
var Comments = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkHikingspotOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Hikes.findById(req.params.id, function(err, foundHike) {
            if (err) {
                res.redirect("back");
            } else {
                //if so, did user create the hikingspot
                //foundHike.author.id (mongoose object) === req.user._id (string) is false. Even though console logging it appears to be a string
                if (foundHike.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        //takes user back to previous page they were on
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comments.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                //if so, did user create the comment?
                //foundHike.author.id (mongoose object) === req.user._id (string) is false. Even though console logging it appears to be a string
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        //takes user back to previous page they were on
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;