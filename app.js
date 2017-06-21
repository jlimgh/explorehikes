var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/explore_hikes");

//schema
var hikesSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

//model
var Hikes = mongoose.model("Hikes", hikesSchema);

// Hikes.create(
//     {
//         name: "Mountain", 
//         image: "https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg",
//         description: "This mountain is great. Tester run"
//     }, function(err, hike) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("newly created hike!");
//             console.log(hike);
//         }
// })


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// var hikes = [
//     {name: "Mountain", image: "https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg"},
//     {name: "Granite Hill", image: "https://farm1.staticflickr.com/453/19094215060_de6549b159.jpg"},
//     {name: "Goat Rest", image: "https://farm3.staticflickr.com/2886/34400868465_f4d39d6361.jpg"},
//     {name: "Mountain", image: "https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg"},
//     {name: "Granite Hill", image: "https://farm1.staticflickr.com/453/19094215060_de6549b159.jpg"},
//     {name: "Goat Rest", image: "https://farm3.staticflickr.com/2886/34400868465_f4d39d6361.jpg"}    
// ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikingspots", function(req, res) {
    //get all hikes from db
    Hikes.find({}, function(err, allHikes) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {hikes: allHikes});
        }
    })
});


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

app.get("/hikingspots/new", function(req, res) {
    res.render("new.ejs");
})

app.get("/hikingspots/:id", function(req, res) {
    //find hike w/ provided id
    //render show template w/ that hike
    Hikes.findById(req.params.id, function(err, foundHike) {
        if (err) {
            console.log(err)
        } else {
            res.render("show", {hike: foundHike});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Explore Hikes has started!");
})