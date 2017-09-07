var express = require("express");
var router = express.Router({mergeParams: true});
var Hikes = require("../models/hikes");
var Comments = require("../models/comment");
var middleware = require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Hikes.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {hike: hike});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
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

//Comments Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comments.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {hike_id: req.params.id, comment: foundComment});
        }
    });
});

//Comments Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/hikingspots/" + req.params.id);
        }
    });
});

//Comments Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findById and remove
    Comments.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/hikingspots/" + req.params.id);
        }
    });
});


module.exports = router;