const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    heading: {
        type: String,
    },
    formCode: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },
    html: {
        type: String,
        required: true
    },
    metaData: [{
        headings: { type: String },
        type: { type: String },
        name: { type: String },
        options: []
    }],
    receivedObj:{type:Object},
    responses: [],
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    backgroundColor: {
        type: String,
        default: '#3b8cb5'
    },
    fontSize: {
        type: Number,
        default: '12',
    },
    textColor: {
        type: String,
        default: "#000000"
    },
    fontFamily: {
        type: String,
        default: 'Arial'
    },
    logo: {
        type: String,
        default: null
    },
    backgroundImage: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Form', formSchema);