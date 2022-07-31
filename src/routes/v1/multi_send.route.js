const express = require('express');
const validate = require('../../middlewares/validate');
const multiSendValidation = require('../../validations/multi_send.validation');
const multiSendController = require('../../controllers/multi_send.controller');

const router = express.Router();

router.get('/:network', validate(multiSendValidation.contract), multiSendController.getBalance);
router.post('/:network', validate(multiSendValidation.withdrawls), multiSendController.withdrawls);
router.post('/charge/:network', validate(multiSendValidation.charge), multiSendController.charge);
router.get('/owner/:network', validate(multiSendValidation.contract), multiSendController.getOwner);
router.post('/owner/:network', validate(multiSendValidation.changeOwner), multiSendController.changeOwner);

module.exports = router;
