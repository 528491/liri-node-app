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
    var params = {screen_name: "roswellforever2"};
    client.get("statuses/user_timeline", params, function(error, tweets, response){
        if (error){
            console.log(error);
        }
        else {
            //User may have less than 20 tweets
            if (tweets.length < 20){
                for (tweetIndex in tweets){
                    console.log(tweets[tweetIndex].text);
                }
            }
            else {
                for (tweetIndex = 0; tweetIndex < 20; tweetIndex++){
                    console.log(tweets[tweetIndex].text);
                }
            }

        }
    })
}

if (command == spotifyCommand){

}

if (command == movieCommand){

}

if (command == doWhatItSaysCommand){

}