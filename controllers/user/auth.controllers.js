const { validationResult } = require('express-validator');

const hashPassword = require('../../utils/hash-password');

const AdminModel = require('../../models/Admin.model');

exports.getSignIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/user/form');
    }
    res.render('user/login');
}

exports.getSignUp = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/user/form');
    }
    res.render('user/sign-up');
}

exports.postSignIn = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errorMessage', errors.array()[0].msg)
            return res.redirect('/user/signup');
        }
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email: email });
        if (!admin) {
            req.flash('errorMessage', 'Email address doesn\'t exists.');
            return res.redirect('/user/signup');
        }
        if (!admin.validatePassword(password)) {
            req.flash('errorMessage', 'Password doesn\'t match.');
            return res.redirect('/user/signup');
        }
        req.session.user = admin;
        if (req.body.remember) {
            req.session.cookie.expires = 20 * 24 * 60 * 60 * 1000;
            req.session.cookie.maxAge = 20 * 24 * 60 * 60 * 1000;
        }
        return req.session.save(err => {
            if (err) throw new Error(err);
            return res.redirect('/user/form');
        });
    } catch (err) {
        next(err);
    }
}

exports.postSignUp = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('errorMessage', errors.array()[0].msg)
            return res.redirect('/user/signup');
        }
        const { email, name, password } = req.body;
        const newAdmin = new AdminModel({ email, name, password: hashPassword(password) });
        const admin = await newAdmin.save();
        req.session.user = admin;
        return req.session.save(err => {
            if (err) throw new Error(err);
            return res.redirect('/user/form');
        });
    } catch (err) {
        next(err);
    }
}

exports.getLogout = (req, res, next) => {
    return req.session.destroy(err => {
        if (err) throw err;
        return res.redirect('/user/signin');
    })
}