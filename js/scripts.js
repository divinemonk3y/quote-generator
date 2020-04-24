// get quote
var quote = document.getElementById('quote');
var author = document.getElementById('author');
var newBtn = document.getElementById("new");
var tweetBtn = document.getElementById("tweet");

var tweet = "";

// TODO add quote request

function getQuote() {
    var req = new XMLHttpRequest();
    req.withCredentials = true;

    req.open("GET", "https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1");
    req.setRequestHeader("x-rapidapi-host", window.creds.host);
    req.setRequestHeader("x-rapidapi-key", window.creds.key);
    req.send();

    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var json = JSON.parse(req.responseText);
            quote.innerHTML = '"' + json[0].quote + '"';
            author.innerHTML = json[0].author;
            tweet = "\"" + json[0].quote + "\" " + json[0].author + " #qotd";
        } else {
            quote.innerHTML = "Could not load quote. Please try again.";
            tweet = "";
        }
    };
}

// run getQuote();
getQuote();

// on button click
newBtn.addEventListener('click', function(e) {
    quote.innerHTML = "Getting your quote...";
    author.innerHTML = "";
    getQuote();
});

tweetBtn.addEventListener('click', function(e) {
    if (tweet.length >= 140) {
        tweet = tweet.substr(0, 128) + '... #qotd';
    }
    
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet));
});