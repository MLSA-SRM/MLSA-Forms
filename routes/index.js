const express = require('express');

const router = express.Router();

const adminRoutes = require('./user/index.admin.routes');
const userPublicFormRoutes = require('./public/form.routes');


router.use('/forms', userPublicFormRoutes);

router.get('/', (req, res, next) => {
    res.redirect('/user/signin');
});

router.use('/user', adminRoutes);

module.exports = router;