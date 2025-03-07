const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contractorPortfolioService } = require('../services');

const createContractorPortfolio = catchAsync(async (req, res) => {
  const contractor = await contractorPortfolioService.createContractorPortfolio(req.body);
  res.status(httpStatus.CREATED).send(contractor);
});

const getContractorPortfolios = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['contractorName', 'location']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await contractorPortfolioService.getContractorPortfolios(filter, options);
  res.send(result);
});

const getContractorPortfolio = catchAsync(async (req, res) => {
  const contractor = await contractorPortfolioService.getContractorPortfolioById(req.params.contractorId);
  if (!contractor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contractor Portfolio not found');
  }
  res.send(contractor);
});

const updateContractorPortfolio = catchAsync(async (req, res) => {
  const contractor = await contractorPortfolioService.updateContractorPortfolioById(req.params.contractorId, req.body);
  res.send(contractor);
});

const deleteContractorPortfolio = catchAsync(async (req, res) => {
  await contractorPortfolioService.deleteContractorPortfolioById(req.params.contractorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContractorPortfolio,
  getContractorPortfolios,
  getContractorPortfolio,
  updateContractorPortfolio,
  deleteContractorPortfolio,
};
