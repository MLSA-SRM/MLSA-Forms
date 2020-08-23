const FormModel = require('../../models/Form.model');

exports.getForm = async(req, res, next) => {
    try {
        const form = await FormModel.findOne({ formCode: req.params.formCode });
        if (!form) {
            return res.render('404');
        }
        console.log(form)
        res.render('temp', { form });
    } catch (err) {
        next(err);
    }
}

exports.postForm = async(req, res, next) => {
    try {
        const form = await FormModel.findOne({ formCode: req.params.formCode });
        let response = {}
        form.metaData.forEach(e => {
            if (req.body[e.name]) {
                let answer = req.body[e.name];
                if (e.type === 'array' && !(Array.isArray(answer))) {
                    answer = [answer];
                }
                response[e.name] = answer;
            } else {
                response[e.name] = (e.type === 'array') ? [] : '';
            }
        });
        response['date'] = new Date();
        form.responses.push(response);
        await form.save();
        res.send('ok');
    } catch (err) {
        next(err);
    }
}