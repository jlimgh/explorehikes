var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Hikes = require("./models/hikes");
var Comments = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");
var hikingRoutes = require("./routes/hikingspots");
//seed DB
// seedDB();
mongoose.connect("mongodb://localhost/explore_hikes");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//passport config
app.use(require("express-session")({
    secret: "Inspired LBC is up and coming",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/hikingspots", hikingRoutes);
app.use("/hikingspots/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Explore Hikes has started!");

});