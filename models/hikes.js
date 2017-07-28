var mongoose = require("mongoose");

//schema
var hikesSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//model
module.exports = mongoose.model("Hikes", hikesSchema);