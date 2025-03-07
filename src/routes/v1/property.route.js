const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const propertyValidation = require('../../validations/property.validation');
const propertyController = require('../../controllers/property.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(propertyValidation.createProperty), propertyController.createProperty)
  .get(validate(propertyValidation.getProperties), propertyController.getProperties);

router
  .route('/:propertyId')
  .get(validate(propertyValidation.getProperty), propertyController.getProperty)
  .patch(validate(propertyValidation.updateProperty), propertyController.updateProperty)
  .delete(auth('manageProperties'), validate(propertyValidation.deleteProperty), propertyController.deleteProperty);

router.route('/user/:userId').get(propertyController.getPropertiesByUser);

module.exports = router;
