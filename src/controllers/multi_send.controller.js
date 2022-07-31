const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ethAccountService, multiSendService } = require('../services');
const { getResObject } = require('../utils/response');
const { maxFeeFromReceipt } = require('../utils/fee');

// * GET: 계약 코인 잔액 조회
const getBalance = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;
  const balance = await ethAccountService.getBalance(network, contractAddress);
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, balance.toString()),
  );
});

// * POST: 멀티 전송
const withdrawls = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    addresses,
    amounts,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await multiSendService
    .withdrawls(network, contractAddress, {
      privateKey,
      addresses,
      amounts,
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

// * POST: 코인 충전
const charge = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await multiSendService
    .charge(network, contractAddress, {
      contractAddress,
      privateKey,
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

// * GET: Onwer 조회
const getOwner = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;
  const balance = await multiSendService.getOwner(network, contractAddress);
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, balance.toString()),
  );
});

// * POST: Owner 변경
const changeOwner = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    newOwner,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await multiSendService
    .changeOwner(network, contractAddress, {
      privateKey,
      newOwner,
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
  getBalance,
  withdrawls,
  charge,
  getOwner,
  changeOwner,
};
