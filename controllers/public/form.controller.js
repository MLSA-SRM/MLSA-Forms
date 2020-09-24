const moment = require('moment');
const FormModel = require('../../models/Form.model');

exports.getForm = async(req, res, next) => {
    try {
        let preview = false;
        if (Boolean(req.query.preview)) {
            preview = true
        }
        const form = await FormModel.findOne({ formCode: req.params.formCode });
        if (!form) {
            return res.render('404');
        }
        res.render('temp', { form, preview });
    } catch (err) {
        next(err);
    }
}

exports.postForm = async(req, res, next) => {
    try {
        const form = await FormModel.findOne({ formCode: req.params.formCode });
        let response = {}
        form.metaData.forEach(e => {

            if (req.body[e.name] || (req.files && req.files.file && req.files.file.length > 0)) {
                let answer = req.body[e.name];
                if (e.type === 'array' && !(Array.isArray(answer))) {
                    answer = [answer];
                }
                if (e.type === 'file') {
                    answer = (req.files.file[0].url) ? req.files.file[0].url : '';
                }
                response[e.name] = answer;
            } else {
                response[e.name] = (e.type === 'array') ? [] : '';
            }
        });
        response['timestamp'] = moment().format('DD/MM/YYYY HH:mm:ss');
        form.responses.push(response);
        await form.save();
        res.redirect('/forms/submit/' + form.formCode);
    } catch (err) {
        next(err);
    }
}

exports.getFormSubmit = async(req, res, next) => {
    try {
        const form = await FormModel.findOne({ formCode: req.params.formCode });
        if (!form) {
            return res.render('404');
        }
        res.render('aftermath');
    } catch (err) {
        next(err);
    }
}