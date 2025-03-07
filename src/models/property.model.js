const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const propertySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['Home', 'Plot'],
      required: true,
    },
    location: {
      city: { type: String, required: true },
      address: { type: String, required: true },
      area: { type: Number, required: true }, // in Marla or Kanal
      unit: { type: String, enum: ['Marla', 'Kanal'], required: true },
    },
    price: {
      type: Number,
      required: true,
    },
    isNegotiable: {
      type: Boolean,
      default: false,
    },
    features: {
      bedrooms: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 0 },
      floors: { type: Number, default: 1 },
      garage: { type: Boolean, default: false },
    },
    images: [{ type: String }],
    videos: [{ type: String }],
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Under Offer'],
      default: 'Available',
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'any')) {
          throw new Error('Invalid phone number');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
