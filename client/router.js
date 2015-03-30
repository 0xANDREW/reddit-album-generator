Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    template: 'home'
});

Router.route('/albums', {
    data: function(){
        return { albums: ALBUMS.find({}, { sort: { created_at: -1 }}) };
    }
});

Router.route('/albums/:id', {
    template: 'album',

    data: function(){
        return ALBUMS.findOne(this.params.id);
    }
});
