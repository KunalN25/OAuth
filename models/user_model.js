const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    google_id: String,
    thumbnail: String
});

//The first argument is the collection name and
//mongodb will pluralize the name so the collection name
//should be user
const User = mongoose.model('User', UserSchema);

module.exports = User;