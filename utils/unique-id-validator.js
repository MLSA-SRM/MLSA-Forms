const shortid = require('shortid');

const FormModel = require('../models/Form.model');

const formCodeGenerator = async(id = shortid.generate()) => {
    const formExistis = await FormModel.countDocuments({ formCode: id });
    if (formExistis === 0) {
        return id;
    } else {
        return formCodeGenerator(shortid.generate());
    }
}

module.exports = formCodeGenerator;