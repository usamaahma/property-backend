const httpStatus = require('http-status');
const Contact = require('../models/contactus.model');
const ApiError = require('../utils/ApiError');

const createContact = async (contactData) => {
  return Contact.create(contactData);
};

const getContacts = async (filter, options) => {
  return Contact.find(filter).sort(options.sortBy).limit(options.limit).skip(options.page);
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const updateContactById = async (contactId, updateBody) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  Object.assign(contact, updateBody);
  await contact.save();
  return contact;
};

const deleteContactById = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }
  await contact.deleteOne();
  return contact;
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContactById,
  deleteContactById,
};
