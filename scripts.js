// get quote
var quote = document.getElementById('quote');
var author = document.getElementById('author');
var newBtn = document.getElementById("new");
var tweetBtn = document.getElementById("tweet");

var tweet = "";
var success = false;

// TODO add quote request

function getQuote() {
    var req = new XMLHttpRequest();

    req.open('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous');
    req.setRequestHeader('X-Mashape-Key', 'WciRzZDyrGmshTIxGybh6FhoAc74p1HtnZWjsnhULIoqeUIq1g');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setRequestHeader('Accept', 'application/json');
    req.send();

    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            var json = JSON.parse(req.responseText);
            quote.innerHTML = '"' + json.quote + '"';
            author.innerHTML = json.author;
            tweet = "\"" + json.quote + "\" " + json.author + " #qotd";
            success = true;
        } else {
            quote.innerHTML = "Could not load quote. Please try again.";
            tweet = "";
            success = false;
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
    if (success === true) {
        if (tweet.length >= 140) {
            tweet = tweet.substr(0, 128) + '... #qotd';
        }
        
        window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet));
    } else {
        quote.innerHTML = "Tweet could not be sent. Please try getting another quote."
    }
});