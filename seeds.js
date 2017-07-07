var mongoose = require("mongoose");
var Hikes = require("./models/hikes");
var Comments = require("./models/comment");
var data = [
    {
        name: "Canyon Niceness",
        image:"https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg",
        description: "blah blah blah"
    },
    {
        name: "Photo Farm",
        image:"https://farm6.staticflickr.com/5240/5901787178_5eef7e4134.jpg",
        description: "blah blah blah"
    },
    {
        name: "Crystal Peak",
        image: "https://farm1.staticflickr.com/267/19917703508_d580a41ee5.jpg",
        description: "blahs 2 times the blahhhh"
    },
    {
        name: "Mount Signal",
        image: "https://farm1.staticflickr.com/362/19281777555_c7f722cbde.jpg",
        description: "blahs 2 times the blahhhh"
    }

];

function seedDB() {
    //remove hikes
    Hikes.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
             //add hikes
            data.forEach(function(seed) {
                Hikes.create(seed, function(err, hike) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("we created a new hike");
                        Comments.create(
                            {
                                text: "this is a test text comment. work!",
                                author: "Juvy"
                            }, function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    hike.comments.push(comment);
                                    hike.save();
                                    console.log("created a new comment");
                                }
                            }
                        )
                    }
                })
            })
        }
    });
    
    //add comments
}

module.exports = seedDB;