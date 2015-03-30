function generate(tpl){
    tpl.$('#artist, #title').html('');
    tpl.$('#image').attr('src', '');

    Meteor.call('get_album', function(err, album){
        tpl.$('#artist').html(album.artist);
        tpl.$('#title').html(album.title);
        tpl.$('#image').attr('src', album.image_url);

        var _id = ALBUMS.insert(album);
        Router.go('/albums/' + _id);
    });
}

// Template.body.events({
//     'click #go': function(){
//         generate(Template.instance());
//     }
// });    

Template.home.onRendered(function(){
    generate(Template.instance());
});

Template.album_row.events({
    'click .delete': function(){
        var _id = Template.instance().$('.album-id').val();
        ALBUMS.remove(_id);
    }
});
