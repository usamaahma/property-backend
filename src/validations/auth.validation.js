const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid('user', 'dealer', 'contractor').required(),

    description: Joi.string().allow('').optional(),

    phoneNumber: Joi.string()
      .allow('')
      .when('role', {
        is: Joi.valid('dealer', 'contractor'),
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),

    agencyName: Joi.string()
      .allow('')
      .when('role', {
        is: Joi.valid('dealer', 'contractor'),
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),

    agencyNtnNumber: Joi.string()
      .allow('')
      .when('role', {
        is: Joi.valid('dealer', 'contractor'),
        then: Joi.string().required(),
        otherwise: Joi.optional(),
      }),

    agencyAddress: Joi.array()
      .items(
        Joi.object({
          street: Joi.string().allow(''),
          city: Joi.string().allow(''),
          state: Joi.string().allow(''),
          zipCode: Joi.string().allow(''),
          country: Joi.string().allow(''),
        })
      )
      .when('role', {
        is: Joi.valid('dealer', 'contractor'),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),

    avatar: Joi.string().allow('').optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
