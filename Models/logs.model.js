const mongoose = require('mongoose');

const LogsModel = new mongoose.Schema({
    type:  {
        required: true,
        type: String
    },
    action:  {
        required: true,
        type: String
    },
    method: {
        required: true,
        type: String
    },
    payload: {
        required: true,
        type: Object,
        default: null
    },
    createdAt: {
        default: Date.now(),
        type: Date
    }
}, {versionKey: false});

module.exports = mongoose.model('logs_info', LogsModel)