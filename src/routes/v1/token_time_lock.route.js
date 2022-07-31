const express = require('express');
const validate = require('../../middlewares/validate');
const tokenTimeLockValidation = require('../../validations/token_time_lock.validation');
const tokenTimeLockController = require('../../controllers/token_time_lock.controller');

const router = express.Router();

router.get('/:network', validate(tokenTimeLockValidation.contract), tokenTimeLockController.getTokenBalance);
router.post('/:network', validate(tokenTimeLockValidation.release), tokenTimeLockController.release);
router.get('/info/:network', validate(tokenTimeLockValidation.contract), tokenTimeLockController.getInfo);

module.exports = router;
