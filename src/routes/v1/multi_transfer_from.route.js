const express = require('express');
const validate = require('../../middlewares/validate');
const multiTransferFromValidation = require('../../validations/multi_transfer_from.validation');
const multiTransferFromController = require('../../controllers/multi_transfer_from.controller');

const router = express.Router();

router.get('/:network', validate(multiTransferFromValidation.getOwnerTokenInfo), multiTransferFromController.getOwnerTokenInfo);
router.post('/:network', validate(multiTransferFromValidation.multiTransferFrom), multiTransferFromController.multiTransferFrom);
router.get('/owner/:network', validate(multiTransferFromValidation.contract), multiTransferFromController.getOwner);
router.post('/owner/:network', validate(multiTransferFromValidation.transferOwnership), multiTransferFromController.transferOwnership);

module.exports = router;
