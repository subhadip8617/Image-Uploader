const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    photoUrl : {
        type: String,
        required: [true, 'PhotoUrl is required']
    },
    uploader : {
        type: String,
        required: [true, 'Uploader is required']
    }
})

module.exports = mongoose.model('photos', photoSchema);