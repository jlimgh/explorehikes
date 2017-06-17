var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var hikes = [
    {name: "Mountain", image: "https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/453/19094215060_de6549b159.jpg"},
    {name: "Goat Rest", image: "https://farm3.staticflickr.com/2886/34400868465_f4d39d6361.jpg"},
    {name: "Mountain", image: "https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/453/19094215060_de6549b159.jpg"},
    {name: "Goat Rest", image: "https://farm3.staticflickr.com/2886/34400868465_f4d39d6361.jpg"}    
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikingspots", function(req, res) {
    res.render("hikes", {hikes: hikes});
});


app.post("/hikingspots", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newHike = {name: name, image: image};
    
    hikes.push(newHike);
    res.redirect("/hikingspots");
});

app.get("/hikingspots/new", function(req, res) {
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Explore Hikes has started!");
})