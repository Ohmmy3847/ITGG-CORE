const mongoose = require('mongoose');

const LiveModel = new mongoose.Schema({
    live_url:  {
        required: true,
        type: String
    },
    order:  {
        required: true,
        type: Number
    },
}, {versionKey: false});

module.exports = mongoose.model('live_info', LiveModel)