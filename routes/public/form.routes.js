const express = require('express');

const router = express.Router();

const publicFormController = require('../../controllers/public/form.controller');

router.get('/submit/:formCode', publicFormController.getFormSubmit);

router.get('/:formCode', publicFormController.getForm);

router.post('/:formCode', publicFormController.postForm);


module.exports = router;