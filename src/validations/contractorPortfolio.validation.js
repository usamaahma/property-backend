const Joi = require('joi');

const houseSchema = Joi.object().keys({
  title: Joi.string().required(),
  detail: Joi.string().required(),
  location: Joi.string().required(),
  housePics: Joi.array().items(Joi.string().uri()).required(),
});

const createContractorPortfolio = {
  body: Joi.object().keys({
    contractorName: Joi.string().required(),
    contactNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    experience: Joi.string().required(),
    projects: Joi.array().items(houseSchema),
  }),
};

const updateContractorPortfolio = {
  body: Joi.object().keys({
    contractorName: Joi.string(),
    contactNumber: Joi.string(),
    email: Joi.string().email(),
    experience: Joi.string(),
    projects: Joi.array().items(houseSchema),
  }),
};

const getContractorPortfolio = {
  params: Joi.object().keys({
    contractorId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  createContractorPortfolio,
  updateContractorPortfolio,
  getContractorPortfolio,
};
