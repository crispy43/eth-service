const express = require('express');
const validate = require('../../middlewares/validate');
const transactionValidation = require('../../validations/transaction.validation');
const transactionController = require('../../controllers/transaction.controller');

const router = express.Router();

router.get('/:network', validate(transactionValidation.getTransaction), transactionController.getTransaction);
router.get('/receipt/:network', validate(transactionValidation.getTransaction), transactionController.getTransactionReceipt);
router.get('/confirmed/:network', validate(transactionValidation.getTransaction), transactionController.isConfirmed);
router.post('/send/:network', validate(transactionValidation.send), transactionController.send);

module.exports = router;
