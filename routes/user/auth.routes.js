const express = require('express')
const { body } = require('express-validator');

const router = express.Router();

const Admin = require('../../models/Admin.model');

const authController = require('../../controllers/user/auth.controllers');

router.get('/signin', authController.getSignIn);

router.get('/signup', authController.getSignUp);

router.post('/signin', [body('email', 'Please enter a valid Email.').not().isEmpty().isEmail().normalizeEmail(),
    body('password', 'Please enter a valid password.').not().isEmpty().isLength({ min: 6, max: 15 }).trim()
], authController.postSignIn);

router.post('/signup', [body('name', 'Please enter a name.').not().isEmpty().trim(),
    body('email', 'Please enter a valid Email.').not().isEmpty().isEmail().custom((value, { req }) => {
        return Admin.find({ email: value }).then(admins => {
            if (admins.length > 0) {
                return Promise.reject('Email already exists');
            }
        })
    }).normalizeEmail(),
    body('password', 'Please enter a valid password.').not().isEmpty().isLength({ min: 6, max: 15 }).trim(),
    body('password', 'Please enter a valid password.').not().isEmpty().isLength({ min: 6, max: 15 }).trim().custom((value, { req }) => {
        if (value.trim() != req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    })
], authController.postSignUp)

module.exports = router;