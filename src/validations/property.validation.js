const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProperty = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('Home', 'Plot').required(),
    location: Joi.object()
      .keys({
        city: Joi.string().required(),
        address: Joi.string().required(),
        area: Joi.number().required(),
        unit: Joi.string().valid('Marla', 'Kanal').required(),
      })
      .required(),
    price: Joi.number().required(),
    isNegotiable: Joi.boolean().default(false),
    features: Joi.object().keys({
      bedrooms: Joi.number().default(0),
      bathrooms: Joi.number().default(0),
      floors: Joi.number().default(1),
      garage: Joi.boolean().default(false),
    }),
    images: Joi.array().items(Joi.string()),
    videos: Joi.array().items(Joi.string()),
    status: Joi.string().valid('Available', 'Sold', 'Under Offer').default('Available'),
    listedBy: Joi.string().custom(objectId).required(),
    contactNumber: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!/^[0-9]+$/.test(value)) {
          return helpers.message('Invalid phone number');
        }
        return value;
      }),
  }),
};

const getProperties = {
  query: Joi.object().keys({
    title: Joi.string(),
    type: Joi.string().valid('Home', 'Plot'),
    city: Joi.string(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    listedBy: Joi.string().custom(objectId), // Filter by User ID
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getPropertiesByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(), // Get properties by User ID
  }),
};

const getProperty = {
  params: Joi.object().keys({
    propertyId: Joi.string().custom(objectId).required(),
  }),
};

const updateProperty = {
  params: Joi.object().keys({
    propertyId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      type: Joi.string().valid('Home', 'Plot'),
      location: Joi.object().keys({
        city: Joi.string(),
        address: Joi.string(),
        area: Joi.number(),
        unit: Joi.string().valid('Marla', 'Kanal'),
      }),
      price: Joi.number(),
      isNegotiable: Joi.boolean(),
      features: Joi.object().keys({
        bedrooms: Joi.number(),
        bathrooms: Joi.number(),
        floors: Joi.number(),
        garage: Joi.boolean(),
      }),
      images: Joi.array().items(Joi.string()),
      videos: Joi.array().items(Joi.string()),
      status: Joi.string().valid('Available', 'Sold', 'Under Offer'),
      listedBy: Joi.string().custom(objectId),
      contactNumber: Joi.string().custom((value, helpers) => {
        if (value && !/^[0-9]+$/.test(value)) {
          return helpers.message('Invalid phone number');
        }
        return value;
      }),
    })
    .min(1),
};

const deleteProperty = {
  params: Joi.object().keys({
    propertyId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createProperty,
  getProperties,
  getPropertiesByUser,
  getProperty,
  updateProperty,
  deleteProperty,
};
