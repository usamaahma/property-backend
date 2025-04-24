const Joi = require('joi');

const createContact = {
  body: Joi.object().keys({
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(1).max(500).required(),
  }),
};

const getContact = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

const updateContact = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(1).max(50),
    email: Joi.string().email(),
    message: Joi.string().min(1).max(500),
  }),
};

const deleteContact = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
};

module.exports = { createContact, getContact, updateContact, deleteContact };
