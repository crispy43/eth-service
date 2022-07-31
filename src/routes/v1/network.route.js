const express = require('express');
const validate = require('../../middlewares/validate');
const networkValidation = require('../../validations/network.validation');
const networkController = require('../../controllers/network.controller');

const router = express.Router();

router.get('/fee/:network', validate(networkValidation.network), networkController.getFee);
router.post('/estimate_gas/:network', validate(networkValidation.estimateGas), networkController.estimateGas);
router.get('/events/:network', validate(networkValidation.getEvents), networkController.getEvents);

module.exports = router;
