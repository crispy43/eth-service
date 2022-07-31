const express = require('express');
const validate = require('../../middlewares/validate');
const deployValidation = require('../../validations/deploy.validation');
const deployController = require('../../controllers/deploy.controller');

const router = express.Router();

router.post('/erc20/:network', validate(deployValidation.erc20), deployController.deployErc20);
router.post('/token_time_lock/:network', validate(deployValidation.tokenTimeLock), deployController.deployTokenTimeLock);
router.post('/multi_send/:network', validate(deployValidation.deploy), deployController.deployMultiSend);
router.post('/multi_transfer_from/:network', validate(deployValidation.deploy), deployController.deployMultiTransferFrom);

module.exports = router;
