var request = Meteor.npmRequire('request');
var cheerio = Meteor.npmRequire('cheerio');

var WIKIPEDIA_URL = 'http://en.wikipedia.org/wiki/Special:Random';
var QUOTES_URL = 'http://www.quotationspage.com/random.php3';
var FLICKR_URL = 'https://www.flickr.com/explore/interesting/7days/';

var get_artist = Async.wrap(function(done){
    request(WIKIPEDIA_URL, function(err, resp, body){
        var $ = cheerio.load(body);
        var sp = $('#firstHeading').text().split(' (');
        done(null, s.capitalize(sp[0]));
    });
});

var get_album_title = Async.wrap(function(done){
    request(QUOTES_URL, function(err, resp, body){
        var $ = cheerio.load(body);
        var links = $('.quote a');
        var text = $(_.last(links)).text();
        var words = _.map(text.split(' '), function(word){
            return s.capitalize(word.replace(/\./, ''));
        });
        
        done(null, _.last(words, 5).join(' '));
    });
});

var get_album_art = Async.wrap(function(done){
    request(FLICKR_URL, function(err, resp, body){
        var $ = cheerio.load(body);
        var url = $('.TwentyFour td:nth-child(3) img').attr('src');
        
        done(null, url.replace(/\w\.jpg/, 'b.jpg'));
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
