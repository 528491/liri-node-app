require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var Request = require("request");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

//List out the commands as variables - separation of concerns
var twitterCommand = "my-tweets";
var spotifyCommand = "spotify-this-song";
var movieCommand = "movie-this";
var doWhatItSaysCommand = "do-what-it-says";

if (command == twitterCommand){
    console.log("Twitter Command!");
}

if (command == spotifyCommand){

}

if (command == movieCommand){

}

if (command == doWhatItSaysCommand){
    
}