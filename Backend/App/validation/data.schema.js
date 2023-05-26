const Joi = require('joi');

const checkValidation = Joi.string().min(2).pattern(/^[a-zA-ZÀ-ÿ0-9][a-zA-ZÀ-ÿ0-9 '-,._]+$/);

const schema = {
    noteValidate: Joi.object({
        title: checkValidation.error(new Error("Le text du titre entrée n'est pas valide.")),
        subtitle: checkValidation.error(new Error("Le text du sous-titre entrée n'est pas valide.")),
        body: checkValidation.error(new Error("Le text du body entrée n'est pas valide.")),
    }).min(1).required()
};

module.exports = schema;

