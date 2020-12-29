const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    position: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Poweruser',
    },
});

module.exports = mongoose.model('Member', memberSchema);
