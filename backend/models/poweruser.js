const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poweruserSchema = new Schema({
    email: {
        required: true,
        type: String,
    },
    displayName: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    members: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Painting',
        },
    ],
    posts: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Post',
        },
    ],
    resetToken: String,
    resetTokenExpiration: Date,
});

module.exports = mongoose.model('Poweruser', poweruserSchema);
