const express = require('express');
const svgCaptcha = require('svg-captcha');


const router = express.Router();

const adminRoutes = require('./user/index.admin.routes');
const userPublicFormRoutes = require('./public/form.routes');

router.get('/', (req, res, next) => {
    res.redirect('/user/signin');
})

router.use('/forms', userPublicFormRoutes);

router.post('/captcha', (req, res, next) => {
    const captcha = svgCaptcha.create({ size: 6, noise: 10 });
    res.status(200).json(captcha);
});

router.use('/user', adminRoutes);

module.exports = router;