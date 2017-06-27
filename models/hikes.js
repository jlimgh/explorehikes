var mongoose = require("mongoose");

//schema
var hikesSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

//model
module.exports = mongoose.model("Hikes", hikesSchema);
