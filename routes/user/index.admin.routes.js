const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.routes');
const formRoutes = require('./form.routes');

const isAuth = require('../../middleware/user/is-auth');


router.use('/', authRoutes);
router.use(isAuth);
router.use('/form', formRoutes);

module.exports = router;