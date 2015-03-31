function generate(tpl){
    tpl.$('#artist, #title').html('');
    tpl.$('#image').attr('src', '');

    Meteor.call('get_album', function(err, album){
        tpl.$('#artist').html(album.artist);
        tpl.$('#title').html(album.title);
        tpl.$('#image').attr('src', album.image_url);

        var _id = ALBUMS.insert(album);

        // Go to the album page, that way going to the generate link
        // always refreshes
        Router.go('/albums/' + _id);
    });
}

// Generate on page load
Template.home.onRendered(function(){
    generate(Template.instance());
});

Template.album_row.helpers({
    pretty_date: function(date){
        return date.toString('yyyy-MM-dd HH:mm');
    }
});
