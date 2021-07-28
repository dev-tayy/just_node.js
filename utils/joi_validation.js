const Joi = require("joi");

//JOI VALIDATION
function validateData(data) {
    //Validate the incoming request
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(11).max(12).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(data);
}

module.exports.validate = validateData;