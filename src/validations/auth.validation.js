const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    description: Joi.string().optional(),
    role: Joi.string().valid('user', 'dealer', 'contractor').required(),
    phoneNumber: Joi.string().when('role', {
      is: Joi.valid('dealer', 'contractor'),
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    agencyName: Joi.string().when('role', {
      is: Joi.valid('dealer', 'contractor'),
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    agencyNtnNumber: Joi.string().when('role', {
      is: Joi.valid('dealer', 'contractor'),
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
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
        otherwise: Joi.forbidden(),
      }),

    // Avatar field added (optional)
    avatar: Joi.string().optional(),
  }),
};

module.exports = {
  register,
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
