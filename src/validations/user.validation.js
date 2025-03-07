const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid('user', 'admin', 'contractor', 'dealer').default('user'),
    avatar: Joi.string().allow(''),
    description: Joi.string().allow(''),
    phoneNumber: Joi.string()
      .allow('')
      .custom((value, helpers) => {
        if (value && !/^[0-9]+$/.test(value)) {
          return helpers.message('Invalid phone number');
        }
        return value;
      }),
    agencyName: Joi.string().allow(''),
    agencyAddress: Joi.array().items(
      Joi.object({
        street: Joi.string().allow(''),
        city: Joi.string().allow(''),
        state: Joi.string().allow(''),
        zipCode: Joi.string().allow(''),
        country: Joi.string().allow(''),
      })
    ),
    propertiesListed: Joi.array().items(Joi.string().custom(objectId)),
    totalListings: Joi.number().default(0),
    rating: Joi.number().default(0),
    reviews: Joi.number().default(0),
    agencyNtnNumber: Joi.string().allow(''),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string().valid('user', 'admin', 'contractor', 'dealer'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      avatar: Joi.string().allow(''),
      description: Joi.string().allow(''),
      phoneNumber: Joi.string()
        .allow('')
        .custom((value, helpers) => {
          if (value && !/^[0-9]+$/.test(value)) {
            return helpers.message('Invalid phone number');
          }
          return value;
        }),
      agencyName: Joi.string().allow(''),
      agencyAddress: Joi.array().items(
        Joi.object({
          street: Joi.string().allow(''),
          city: Joi.string().allow(''),
          state: Joi.string().allow(''),
          zipCode: Joi.string().allow(''),
          country: Joi.string().allow(''),
        })
      ),
      propertiesListed: Joi.array().items(Joi.string().custom(objectId)),
      totalListings: Joi.number(),
      rating: Joi.number(),
      reviews: Joi.number(),
      agencyNtnNumber: Joi.string().allow(''),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
