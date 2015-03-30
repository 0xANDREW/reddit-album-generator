var request = Meteor.npmRequire('request');
var cheerio = Meteor.npmRequire('cheerio');

var WIKIPEDIA_URL = 'http://en.wikipedia.org/wiki/Special:Random';
var QUOTES_URL = 'http://www.quotationspage.com/random.php3';
var FLICKR_URL = 'https://www.flickr.com/explore/interesting/7days/';

// Wrap everything so a single object is returned from the Meteor method
var get_artist = Async.wrap(function(done){
    request(WIKIPEDIA_URL, function(err, resp, body){
        var $ = cheerio.load(body);

        // Remove parens part from title
        var sp = $('#firstHeading').text().split(' (');

        done(null, s.capitalize(sp[0]));
    });
});

var get_album_title = Async.wrap(function(done){
    request(QUOTES_URL, function(err, resp, body){
        var $ = cheerio.load(body);
        var links = $('.quote a');
        var text = $(_.last(links)).text();

        // Remove periods
        var words = _.map(text.split(' '), function(word){
            return s.capitalize(word.replace(/\./, ''));
        });

        // Remove empty words
        words = _.reject(words, function(w){
            return w.length == 0;
        });
        
        done(null, _.last(words, 5).join(' '));
    });
});

var get_album_art = Async.wrap(function(done){
    request(FLICKR_URL, function(err, resp, body){
        var $ = cheerio.load(body);
        var url = $('.TwentyFour td:nth-child(3) img').attr('src');

        // This seems to be the way to get a bigger image without actually visiting
        // the photo page
        url = url.replace(/\w\.jpg/, 'b.jpg');
        
        done(null, url);
    });
});

Meteor.methods({
    get_album: function(){
        return {
            artist: get_artist(),
            title: get_album_title(),
            image_url: get_album_art()
        };
    }
});
