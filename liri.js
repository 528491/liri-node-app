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
    //Set Default Song
    var song = "The Sign";

    //Detect if the user actually entered a song name, and if so,
    //update the song variable.
    if (process.argv[3] != null){
        //Obtain all the elements of the song name, condense to a single string,
        //then update the song variable.
        song = "";
        for (index = 3; index < process.argv.length; index++){
            song = song + " " + process.argv[index];
            song = song.trim();
        }
    }

    spotify.search({type: "track", query: song}, function(error, data){
        if (error){
            console.log(error);
        }
        else {
            var songData = data.tracks.items[0];

            //Print out all the artists
            var artistString = "Artists:";
            for (artistIndex in songData.artists){
                var artistObject = songData.artists[artistIndex];
                var artistName = artistObject.name;
                artistString = artistString + " | " + artistName + " | ";
            }
            console.log(artistString);
            
            //Print the Song Name
            var songNameString = "Song Name: ";
            songNameString = songNameString + songData.name;
            console.log(songNameString);


            //Print the Preview Link
            var previewLinkString = "Preview Link: ";
            previewLinkString = previewLinkString + songData.preview_url;
            console.log(previewLinkString);

            //Print the Album
            var albumString = "Album: ";
            albumString = albumString + songData.album.name;
            console.log(albumString);
            
            //console.log(songData);
        }
    })
}

if (command == movieCommand){

}

if (command == doWhatItSaysCommand){

}