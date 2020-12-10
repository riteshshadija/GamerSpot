var mongoose   = require("mongoose"),
	Game = require("./models/game"),
	Comment    = require("./models/comment");

var data = [
{
	name: "Clouds Rest",
	image: "https://pixabay.com/get/57e0d6424b56ad14f1dc84609620367d1c3ed9e04e50744075267dd59145c7_340.jpg",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s."
},
{
	name: "Born fire",
	image: "https://pixabay.com/get/57e0d6424b56ad14f1dc84609620367d1c3ed9e04e50744075267dd59145c7_340.jpg",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s."
},
{
	name: "Forest camp",
	image: "https://pixabay.com/get/57e0d6424b56ad14f1dc84609620367d1c3ed9e04e50744075267dd59145c7_340.jpg",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s."
}
]

function seedDB() {
	//Remove all games
Game.deleteMany({}, function(err) {
	if(err){
		console.log(err);
	} 
	console.log("removed games!");
	//add a few games
	data.forEach(function(seed) {
		Game.create(seed, function(err, game) {
			if(err){
				console.log(err);
			} else{
				console.log("added a game");
				//create a comment
				Comment.create(
				{
					text: "This place is great, but i wish there was internet",
					author: "Homer"
				}, function(err, comment) {
					if(err){
						console.log(err);
					} else{
						game.comments.push(comment);
						game.save();
						console.log("Created new comment");
					}
				});
			}
	});
});	
});
//add a few comments
}

module.exports = seedDB;