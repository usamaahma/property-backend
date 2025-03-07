const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  housePics: [
    {
      type: String, // URLs for images
      required: true,
    },
  ],
});

const ContractorPortfolioSchema = new mongoose.Schema(
  {
    contractorName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    experience: {
      type: String,
      required: true,
    },
    projects: [HouseSchema], // Array of houses built by the contractor
  },
  { timestamps: true }
);

const ContractorPortfolio = mongoose.model('ContractorPortfolio', ContractorPortfolioSchema);
module.exports = ContractorPortfolio;
