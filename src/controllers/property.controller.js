const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { propertyService } = require('../services');

const createProperty = catchAsync(async (req, res) => {
  const property = await propertyService.createProperty(req.body);
  res.status(httpStatus.CREATED).send(property);
});

const getProperties = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['location', 'type', 'price', 'userId']); // userId add kiya
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await propertyService.queryProperties(filter, options);
  res.send(result);
});

const getProperty = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  res.send(property);
});

const getPropertiesByUser = catchAsync(async (req, res) => {
  const { userId } = req.params; // ✅ Correct way
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
  }
  const properties = await propertyService.getPropertiesByUser(userId);
  res.send(properties);
});

const updateProperty = catchAsync(async (req, res) => {
  const property = await propertyService.updatePropertyById(req.params.propertyId, req.body);
  res.send(property);
});

const deleteProperty = catchAsync(async (req, res) => {
  await propertyService.deletePropertyById(req.params.propertyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  getPropertiesByUser,
  updateProperty,
  deleteProperty,
};
