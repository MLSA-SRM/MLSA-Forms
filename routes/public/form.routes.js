const express = require('express');

const router = express.Router();

const publicFormController = require('../../controllers/public/form.controller');

router.get('/:formCode', publicFormController.getForm);

router.post('/:formCode', publicFormController.postForm);

module.exports = router;