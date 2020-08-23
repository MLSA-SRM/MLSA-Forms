const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    forms: [{
        type: Schema.Types.ObjectId,
        ref: 'Form'
    }]
}, {
    timestamps: true
});

adminSchema.methods.validatePassword = function(password) {
    return this.password === crypto.createHmac('sha256', process.env.PASSWORD_HASH_STRING).update(password).digest('hex');
};

module.exports = mongoose.model('Admin', adminSchema);