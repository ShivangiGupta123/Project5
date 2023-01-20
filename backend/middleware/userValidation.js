const Joi = require('joi')
const validate = Joi.object({
    Username : Joi.string().min(3).max(25).trim().required(),
    Email : Joi.string().email().trim().required(),
    Password : Joi.string().min(3).max(10).trim().required(),
    Confirm_Password : Joi.string().min(3).max(10).trim().required(),
    Phone : Joi.string().trim().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    //YYYY-MM-DD
    DOB : Joi.date().min('1900-01-01').max('2023-01-20').required()


})
module.exports = validate