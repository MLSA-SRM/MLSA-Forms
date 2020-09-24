const User = require('../../models/Admin.model');

module.exports = async(req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/user/signin');
        }
        const user = await User.findById(req.session.user._id);
        if (!user || req.session.user.password !== user.password) {
            return res.redirect('/user/signin');
        }
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}