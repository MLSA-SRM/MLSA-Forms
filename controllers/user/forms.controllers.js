const formHtmlGenerator = require('../../utils/form-html-generator');
const formCodeGenerator = require('../../utils/unique-id-validator');

const FormModel = require('../../models/Form.model');
const AdminModel = require('../../models/Admin.model');

exports.getTotalForms = async(req, res, next) => {
    try {
        const forms = await FormModel.find({ userID: req.session.user._id }).sort({ createdAt: -1 });
        res.render('user/total-forms', { forms });
    } catch (err) {
        next(err);
    }
}

exports.getFromResponses = async(req, res, next) => {
    try {
        const forms = await FormModel.findOne({ formCode: req.params.formCode }).lean();
        if (!forms) {
            return res.redirect('/user/form');
        }
        res.render('user/response', { forms });
    } catch (err) {
        next(err);
    }
}

exports.getFormCreate = (req, res, next) => {
    res.render('user/index');
}

exports.getFormCreate = (req, res, next) => {
    res.render('user/index');
}

exports.postFormCreate = async(req, res, next) => {
    let data = JSON.parse(JSON.parse(req.body.data));
    if (data.data.length === 0) {
        return res.json({ msg: 'Invalid' });
    }
    const html = formHtmlGenerator(data.data);
    const admin = await AdminModel.findById(req.session.user._id);
    const formCode = await formCodeGenerator();
    let formData = {
        heading: data.heading,
        formCode,
        html: html.html,
        metaData: html.headings,
        description: data.description,
        fontFamily: data.fontFamily,
        fontSize: data.fontSize,
        textColor: data.textColor,
        backgroundColor: data.backgroundColor,
        userID: req.session.user._id,
        logo: (req.files) ? (req.files.logo) ? (req.files.logo[0].url) ? req.files.logo[0].url : null : null : null,
        backgroundImage: (req.files) ? (req.files.background) ? (req.files.background[0].url) ? req.files.background[0].url : null : null : null
    };
    const newForm = new FormModel(formData);
    const form = await newForm.save();
    admin.forms.push(form._id);
    await admin.save();
    return res.status(200).json({ msg: 'OK', url: 'http://localhost:3000/forms/' + form.formCode + '?preview=true' });
}



// template -- feedback
exports.getFeedbackTemplate = (req, res, next) => {
    res.render('user/templates/template-feedback');
}

exports.getRegistrationTemplate = (req, res, next) => {
    res.render('user/templates/template-registration');
}
//

exports.getFormDelete = async(req, res, next) => {
    try {
        const id = req.params.id;
        const form = await FormModel.findById(id);
        if (form) {
            await form.remove();
            const userForms = req.user.forms.filter(e => e.toString() !== id.toString());
            req.user.forms = userForms;
            await req.user.save();
        }
        res.redirect('/user/form')
    } catch (err) {
        next(err);
    }
}