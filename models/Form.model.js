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
    responses: [],
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Form', formSchema);