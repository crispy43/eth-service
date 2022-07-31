const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ethTransactionService, ethAccountService } = require('../services');
const { getResObject } = require('../utils/response');
const { maxFeeFromReceipt } = require('../utils/fee');

// * GET: 트랜잭션 조회
const getTransaction = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { transactionHash } = req.query;
  const transaction = await ethTransactionService.getTransaction(network, transactionHash);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, transaction),
  );
});

// * GET: 트랜잭션 Receipt 조회
const getTransactionReceipt = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { transactionHash } = req.query;
  const transactionReceipt = await ethTransactionService
    .getTransactionReceipt(network, transactionHash);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, transactionReceipt),
  );
});

// * GET: 트랜잭션 컨펌 여부 확인
const isConfirmed = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { transactionHash } = req.query;
  const transaction = await ethTransactionService.getTransaction(network, transactionHash);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, (transaction.confirmations >= 1)),
  );
});

// * POST: 이더리움 전송
const send = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    privateKey,
    to,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;
  const receipt = await ethAccountService.send(network, {
    privateKey,
    to,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      transactionHash: receipt.hash,
      maxFee: maxFeeFromReceipt(receipt),
    }),
  );
});

module.exports = {
  getTransaction,
  getTransactionReceipt,
  isConfirmed,
  send,
};
