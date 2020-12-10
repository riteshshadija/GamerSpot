var express = require("express");
var router  = express.Router();
var Game = require("../models/game");
var middleware = require("../middleware");

// // INDEX- show all games
// router.get("/", function(req, res) {
// 	console.log(req.user);
// 	//Get all games from Database
// 	Game.find({}, function(err, allgames) {
// 		//this find method finds all the infrormation(like rows in sql) and give in allgames variable and we push it into campgronds variable and render it to game page
// 		if(err){
// 			console.log(err);
// 		}else{
// 			 res.render("games/index", {games : allgames});
// 		}
// 	});
// });

// INDEX - show all games
router.get("/", function (req, res) {
    var perPage = 4;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Game.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allgames) {
        Game.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("games/index", {
                    games: allgames,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

// CREATE- add new games to DB
router.post("/",middleware.isLoggedIn, function(req, res) {
	//get data from form and add to games array
	var name= req.body.name;
	var price= req.body.price;
	var image= req.body.image;
	var desc= req.body.desc;
	var author ={
		id: req.user._id,
		username: req.user.username
	}
	var newgame= {name: name,price: price,image: image,description: desc, author: author};

	//Adding newgame to the database
	Game.create(newgame, function(err, newlyCreated) {
		if(err){
			console.log(err);
		}else{
			console.log("Game created");
			console.log(newlyCreated);
			res.redirect("/games");
		}
	});
	// redirect back to game page
});

//NEW- show form to create new game
router.get("/new",middleware.isLoggedIn, function(req, res) {
	res.render("games/new");
});

// SHOW- shows more info about one game
router.get("/:id", function(req, res) {
	//find the  game with provided id
	Game.findById(req.params.id).populate("comments").exec(function(err, foundgame) {
		if(err){
			console.log(err);
		}else{
			//render show template with that game
			console.log(foundgame);
			res.render("games/show", {game: foundgame});
		}
	});
	
});

//EDIT GAME ROUTE
router.get("/:id/edit", middleware.checkGameOwnership, function(req, res) {
		Game.findById(req.params.id, function(err, foundgame) {
				res.render("games/edit", {game: foundgame});
		});
	});


//UPDATE GAME ROUTE
router.put("/:id", middleware.checkGameOwnership, function(req, res) {
	// find and update the correct game
	Game.findByIdAndUpdate(req.params.id, req.body.game, function(err, updatedgame) {
		if(err){
			res.redirect("/games");
		} else{
			// redirect in the show page
			res.redirect("/games/"+req.params.id);
		}
	});
});

// DESTROY GAME ROUTE
router.delete("/:id", middleware.checkGameOwnership, function(req, res) {
	Game.findByIdAndRemove(req.params.id, function(err) {
		if(err){
			res.redirect("/games");
		} else{
			res.redirect("/games");
		}
	});
});

module.exports = router;