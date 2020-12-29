const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    dateCreated: {
        required: true,
        type: Date,
    },
    dateModified: {
        type: Date,
    },
    title: {
        required: true,
        type: String,
    },
    content: {
        required: true,
        type: String,
    },
    creator: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Poweruser',
    },
});

module.exports = mongoose.model('Post', postSchema);
