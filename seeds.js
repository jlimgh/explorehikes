var mongoose = require("mongoose");
var Hikes = require("./models/hikes");
var Comments = require("./models/comment");
var data = [
    {
        name: "Canyon Niceness",
        image:"https://farm4.staticflickr.com/3866/18659273934_9dd488d112.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra sapien eget est auctor aliquam. Aliquam erat lectus, rhoncus a auctor sit amet, pellentesque sit amet mi. Quisque placerat mollis eros at lacinia. Aliquam elementum dolor non ligula tristique cursus vel quis quam. Vivamus in tellus quis sapien hendrerit gravida eu ut eros. Etiam pretium, magna sed maximus porta, sem orci luctus lectus, vitae lobortis elit ante et felis. Ut iaculis tristique turpis, in tincidunt lorem mattis quis. Proin non mauris nec diam tristique scelerisque eu accumsan nibh. Ut porta enim et sapien dignissim convallis. Aliquam non dolor quam. Nam tincidunt eros vel orci gravida"
    },
    {
        name: "Photo Farm",
        image:"https://farm6.staticflickr.com/5240/5901787178_5eef7e4134.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra sapien eget est auctor aliquam. Aliquam erat lectus, rhoncus a auctor sit amet, pellentesque sit amet mi. Quisque placerat mollis eros at lacinia. Aliquam elementum dolor non ligula tristique cursus vel quis quam. Vivamus in tellus quis sapien hendrerit gravida eu ut eros. Etiam pretium, magna sed maximus porta, sem orci luctus lectus, vitae lobortis elit ante et felis. Ut iaculis tristique turpis, in tincidunt lorem mattis quis. Proin non mauris nec diam tristique scelerisque eu accumsan nibh. Ut porta enim et sapien dignissim convallis. Aliquam non dolor quam. Nam tincidunt eros vel orci gravida, "
    },
    {
        name: "Crystal Peak",
        image: "https://farm1.staticflickr.com/267/19917703508_d580a41ee5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra sapien eget est auctor aliquam. Aliquam erat lectus, rhoncus a auctor sit amet, pellentesque sit amet mi. Quisque placerat mollis eros at lacinia. Aliquam elementum dolor non ligula tristique cursus vel quis quam. Vivamus in tellus quis sapien hendrerit gravida eu ut eros. Etiam pretium, magna sed maximus porta, sem orci luctus lectus, vitae lobortis elit ante et felis. Ut iaculis tristique turpis, in tincidunt lorem mattis quis. Proin non mauris nec diam tristique scelerisque eu accumsan nibh. Ut porta enim et sapien dignissim convallis. Aliquam non dolor quam. Nam tincidunt eros vel orci gravida, "
    },
    {
        name: "Mount Signal",
        image: "https://farm1.staticflickr.com/362/19281777555_c7f722cbde.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra sapien eget est auctor aliquam. Aliquam erat lectus, rhoncus a auctor sit amet, pellentesque sit amet mi. Quisque placerat mollis eros at lacinia. Aliquam elementum dolor non ligula tristique cursus vel quis quam. Vivamus in tellus quis sapien hendrerit gravida eu ut eros. Etiam pretium, magna sed maximus porta, sem orci luctus lectus, vitae lobortis elit ante et felis. Ut iaculis tristique turpis, in tincidunt lorem mattis quis. Proin non mauris nec diam tristique scelerisque eu accumsan nibh. Ut porta enim et sapien dignissim convallis. Aliquam non dolor quam. Nam tincidunt eros vel orci gravida, "
    }

];

function seedDB() {
    //remove hikes
    Hikes.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds!");
        //      //add hikes
        //     data.forEach(function(seed) {
        //         Hikes.create(seed, function(err, hike) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("we created a new hike");
        //                 Comments.create(
        //                     {
        //                         text: "this is a test text comment. work!",
        //                         author: "Juvy"
        //                     }, function(err, comment) {
        //                         if (err) {
        //                             console.log(err);
        //                         } else {
        //                             hike.comments.push(comment);
        //                             hike.save();
        //                             console.log("created a new comment");
        //                         }
        //                     }
        //                 )
        //             }
        //         })
        //     })
        // }
    });
    
    //add comments
}

module.exports = seedDB;