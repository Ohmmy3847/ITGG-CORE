const { mongoose } = require('mongoose');
const GateInfoModel = new mongoose.Schema({
    gate_name: {
        required: true,
        type: String
    },
    token_amount:  {
        required: true,
        type: Number
    },
    hex: {
        required: true,
        type: String
    },
    backgroundURL: {
        required: true,
        type: String
    },
    mascotURL: {
        required: true,
        type: String
    },
    logoURL: {
        required: true,
        type: String
    }
}, {versionKey: false});

module.exports = mongoose.model('gate_info', GateInfoModel)