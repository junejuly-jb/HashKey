const Joi = require('joi')

const registerValidation = (data) => {

    const schema = Joi.object({

        email: Joi.string().email().required(),
        password: Joi.string().required()

    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation