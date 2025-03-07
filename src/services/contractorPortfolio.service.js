const httpStatus = require('http-status');
const ContractorPortfolio = require('../models/portfolio.model');
const ApiError = require('../utils/ApiError');

const createContractorPortfolio = async (contractorData) => {
  return ContractorPortfolio.create(contractorData);
};

const getContractorPortfolios = async (filter, options) => {
  return ContractorPortfolio.find(filter).sort(options.sortBy).limit(options.limit).skip(options.page);
};

const getContractorPortfolioById = async (id) => {
  return ContractorPortfolio.findById(id);
};

const updateContractorPortfolioById = async (contractorId, updateBody) => {
  const contractor = await getContractorPortfolioById(contractorId);
  if (!contractor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contractor Portfolio not found');
  }
  Object.assign(contractor, updateBody);
  await contractor.save();
  return contractor;
};

const deleteContractorPortfolioById = async (contractorId) => {
  const contractor = await getContractorPortfolioById(contractorId);
  if (!contractor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contractor Portfolio not found');
  }
  await contractor.deleteOne();
  return contractor;
};

module.exports = {
  createContractorPortfolio,
  getContractorPortfolios,
  getContractorPortfolioById,
  updateContractorPortfolioById,
  deleteContractorPortfolioById,
};
