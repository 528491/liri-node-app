require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var Request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var arguments;

//List out the commands as variables - separation of concerns
var twitterCommand = "my-tweets";
var spotifyCommand = "spotify-this-song";
var movieCommand = "movie-this";
var doWhatItSaysCommand = "do-what-it-says";

//Encoding Type that will be used to read from random.txt. Placed here to centralize our concerns
var encoding = "utf8";

//In order to execute code both when called with parameters on the command line as well as execute commands
//From a text file, we will need to encapsulate the functionality (and key parameters) into an object.

var apiRequester = {

    getTweets(){
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
    },

    searchSpotifySong(){
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
    },

    getMovieInfo(){
        var movieTitle = "Mr. Nobody";
        var requestURL = "http://www.omdbapi.com/?i=tt3896198&apikey=403f45c4";

        //ToDo - Make a single function that parses out commands and parameters into 
        //separate units.
        if (process.argv[3] != null){
            //Obtain all the elements of the song name, condense to a single string,
            //then update the song variable.
            movieTitle = "";
            for (index = 3; index < process.argv.length; index++){
                movieTitle = movieTitle + " " + process.argv[index];
                movieTitle = movieTitle.trim();
            }
        }

        movieTitle.replace(" ", "+");
        requestURL = requestURL + "&t=" + movieTitle;

        Request(requestURL, function(error, response){
            if (error){
                console.log(error);
            }
            else {
                var movieData = JSON.parse(response.body);

                console.log("Title: " + movieData.Title);
                console.log("Year: " + movieData.Year);
                console.log("IMDB: "  + movieData.Ratings[0].Value);
                console.log("Rotten Tomatoes: " + movieData.Ratings[1].Value);
                console.log("Country: " + movieData.Country);
                console.log("Language(s): " + movieData.Language);
                console.log("Plot: " + movieData.Plot);
                console.log("Actors: " + movieData.Actors);
            }
        });
    }
}

if (command == twitterCommand){
   apiRequester.getTweets();
}


if (command == spotifyCommand){
    apiRequester.searchSpotifySong();
}

if (command == movieCommand){
    apiRequester.getMovieInfo();
}

if (command == doWhatItSaysCommand){

}

function CommandAndParameter(command, parameter){
    this.command = command;
    this.parameter = parameter;
}

function getCommandsFromFile(filePath){
    
    var commandsAndParameters = [];
    var linesInFile;
    fs.readFile(filePath, encoding, function(error, data){
        if (error){
            console.log(error);
        }
        else {
            //Each line is a command and parameters (if applicable)
            linesInFile = data.split("\n");
            
            //Each line can be further subdivided into two parts - a command and (possibly) a parameter
        }
    });
    

}

//Test Code
/**/ 

getCommandsFromFile("./random.txt");