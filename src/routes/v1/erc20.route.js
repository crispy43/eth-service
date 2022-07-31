const express = require('express');
const validate = require('../../middlewares/validate');
const erc20Validation = require('../../validations/erc20.validation');
const erc20Controller = require('../../controllers/erc20.controller');

const router = express.Router();

router.get('/:network', validate(erc20Validation.getBalance), erc20Controller.getBalance);
router.post('/:network', validate(erc20Validation.transfer), erc20Controller.transfer);
router.put('/:network', validate(erc20Validation.transferFrom), erc20Controller.transferFrom);
router.get('/info/:network', validate(erc20Validation.contract), erc20Controller.getTokenInfo);
router.get('/allowance/:network', validate(erc20Validation.getAllowance), erc20Controller.getAllowance);
router.post('/allowance/:network', validate(erc20Validation.approve), erc20Controller.approve);
router.get('/owner/:network', validate(erc20Validation.contract), erc20Controller.getOwner);
router.post('/owner/:network', validate(erc20Validation.transferOwnership), erc20Controller.transferOwnership);
router.get('/lock/:network', validate(erc20Validation.getLock), erc20Controller.getLock);
router.post('/lock/:network', validate(erc20Validation.setLock), erc20Controller.setLock);

module.exports = router;
