const FormModel = require('../models/Form.model');

const formCodeGenerator = async(id = Math.random().toString(36).slice(2)) => {
    const formExistis = await FormModel.countDocuments({ formCode: id });
    if (formExistis === 0) {
        return id;
    } else {
        return formCodeGenerator(Math.random().toString(36).slice(2));
    }
}

module.exports = formCodeGenerator;