const formHtmlGenerator = require('../../utils/form-html-generator');
const formCodeGenerator = require('../../utils/unique-id-validator');

const FormModel = require('../../models/Form.model');
const AdminModel = require('../../models/Admin.model');

exports.getTotalForms = async(req, res, next) => {
    try {
        const forms = await FormModel.find({ userID: req.session.user._id });
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

exports.postFormCreate = async(req, res, next) => {
    if (req.body.data.length === 0) {
        return res.json({ msg: 'Invalid' });
    }
    console.log(req.body, req.files);
    const html = formHtmlGenerator(req.body.data);
    const admin = await AdminModel.findById(req.session.user._id);
    const formCode = await formCodeGenerator();
    console.log(req.body);
    let formData = {
        heading: req.body.heading,
        formCode,
        html: html.html,
        metaData: html.headings,
        description: req.body.description,
        fontFamily: req.body.fontFamily,
        fontSize: req.body.fontSize,
        textColor: req.body.textColor,
        backgroundColor: req.body.backgroundColor,
        userID: req.session.user._id,
        logo: req.body.logo,
        backgroundImage: req.body.backgroundImage
    };
    const newForm = new FormModel(formData);
    const form = await newForm.save();
    admin.forms.push(form._id);
    await admin.save();
    return res.status(200).json({ msg: 'OK', url: 'http://localhost:3000/forms/' + form.formCode });
}