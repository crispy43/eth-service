const express = require('express');
const validate = require('../../middlewares/validate');
const etherscanValidation = require('../../validations/etherscan.validation');
const etherscanController = require('../../controllers/etherscan.controller');

const router = express.Router();

router.get('/history/erc20/:network', validate(etherscanValidation.getErc20History), etherscanController.getErc20History);

module.exports = router;
