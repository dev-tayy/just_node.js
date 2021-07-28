const Joi = require("joi");

//JOI VALIDATION
function validateData(data) {
    //Validate the incoming request
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(11).max(12).required(),
    });

    return schema.validate(data);
}

module.exports = {validateData};