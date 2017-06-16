var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikingspots", function(req, res) {
    var hikes = [
        {name: "Mountain", image: "https://c1.staticflickr.com/3/2770/4466093934_52d2470d81_b.jpg"},
        {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTttgJpfzusljb4odv33z9mgA39SSC-CghOBWMVzkQssObqGX9"},
        {name: "Goat Rest", image: "https://s-media-cache-ak0.pinimg.com/736x/8a/98/99/8a9899fe167e6c7525b51a5420d7b3f2.jpg"}
    ];
    
    res.render("hikes", {hikes: hikes});
    
    
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Explore Hikes has started!");
})