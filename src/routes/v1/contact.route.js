const express = require('express');
const validate = require('../../middlewares/validate');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(contactValidation.createContact), contactController.createContact) // Create a new contact message
  .get(contactController.getContacts); // Get all contact messages

router
  .route('/:contactId')
  .get(contactController.getContact) // Get a single contact message by ID
  .patch(validate(contactValidation.updateContact), contactController.updateContact) // Update a contact message
  .delete(contactController.deleteContact); // Delete a contact message

module.exports = router;
