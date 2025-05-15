const express = require('express');
const validate = require('../../middlewares/validate');
const propertyValidation = require('../../validations/property.validation');
const propertyController = require('../../controllers/property.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(propertyValidation.createProperty), propertyController.createProperty)
  .get(validate(propertyValidation.getProperties), propertyController.getProperties);

// 👇 Separate route for getting properties by userId
router.route('/user/:userId').get(validate(propertyValidation.getProperties), propertyController.getPropertiesByUser);

router
  .route('/:propertyId')
  .get(validate(propertyValidation.getProperty), propertyController.getProperty)
  .patch(validate(propertyValidation.updateProperty), propertyController.updateProperty)
  .delete(validate(propertyValidation.deleteProperty), propertyController.deleteProperty);

module.exports = router;
