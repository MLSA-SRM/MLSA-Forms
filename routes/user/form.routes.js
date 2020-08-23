const express = require('express');

const router = express.Router();

const formController = require('../../controllers/user/forms.controllers');

router.get('/', formController.getTotalForms);

router.get('/response/:formCode', formController.getFromResponses);

router.get('/create', formController.getFormCreate);

router.post('/create', formController.postFormCreate);

module.exports = router;