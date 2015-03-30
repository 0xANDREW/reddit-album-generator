var schemas = {
    album: new SimpleSchema({
        artist: { type: String },
        title: { type: String },
        image_url: { type: String },
        created_at: { type: Date }
    })
};

ALBUMS = new Mongo.Collection('albums');

ALBUMS.attachSchema(schemas.album);

ALBUMS.before.insert(function(_id, album){
    album.created_at = new Date();
});
