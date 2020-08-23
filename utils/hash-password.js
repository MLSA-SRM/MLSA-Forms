const crypto = require('crypto');

module.exports = (password) => {
    return crypto.createHmac('sha256', process.env.PASSWORD_HASH_STRING).update(password).digest('hex');
}