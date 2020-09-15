const express = require('express');
const svgCaptcha = require('svg-captcha');


const router = express.Router();

const adminRoutes = require('./user/index.admin.routes');
const userPublicFormRoutes = require('./public/form.routes');


router.use('/forms', userPublicFormRoutes);

router.post('/captcha', (req, res, next) => {
    var captcha = svgCaptcha.create({ size: 6, noise: 3 });
    res.status(200).json(captcha);
});

router.use('/user', adminRoutes);

module.exports = router;