const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const contractorPortfolioValidation = require('../../validations/contractorPortfolio.validation');
const contractorPortfolioController = require('../../controllers/contractorPortfolio.controller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(contractorPortfolioValidation.createContractorPortfolio),
    contractorPortfolioController.createContractorPortfolio
  )
  .get(contractorPortfolioController.getContractorPortfolios);

router
  .route('/:contractorId')
  .get(validate(contractorPortfolioValidation.getContractorPortfolio), contractorPortfolioController.getContractorPortfolio)
  .patch(
    validate(contractorPortfolioValidation.updateContractorPortfolio),
    contractorPortfolioController.updateContractorPortfolio
  )
  .delete(
    auth('manageContractors'),
    validate(contractorPortfolioValidation.getContractorPortfolio),
    contractorPortfolioController.deleteContractorPortfolio
  );

module.exports = router;
