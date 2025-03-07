const httpStatus = require('http-status');
const { Property } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a property
 * @param {Object} propertyBody
 * @returns {Promise<Property>}
 */
const createProperty = async (propertyBody) => {
  return Property.create(propertyBody);
};

/**
 * Query for properties
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProperties = async (filter, options) => {
  const properties = await Property.paginate(filter, options);
  return properties;
};

/**
 * Get property by ID
 * @param {ObjectId} propertyId
 * @returns {Promise<Property>}
 */
const getPropertyById = async (propertyId) => {
  return Property.findById(propertyId);
};

/**
 * Get properties by user ID (listedBy)
 * @param {ObjectId} userId
 * @returns {Promise<Array<Property>>}
 */
const getPropertiesByUser = async (userId) => {
  return Property.find({ listedBy: userId });
};

/**
 * Update property by ID
 * @param {ObjectId} propertyId
 * @param {Object} updateBody
 * @returns {Promise<Property>}
 */
const updatePropertyById = async (propertyId, updateBody) => {
  const property = await getPropertyById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  Object.assign(property, updateBody);
  await property.save();
  return property;
};

/**
 * Delete property by ID
 * @param {ObjectId} propertyId
 * @returns {Promise<Property>}
 */
const deletePropertyById = async (propertyId) => {
  const property = await getPropertyById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  await property.remove();
  return property;
};

module.exports = {
  createProperty,
  queryProperties,
  getPropertyById,
  getPropertiesByUser,
  updatePropertyById,
  deletePropertyById,
};
