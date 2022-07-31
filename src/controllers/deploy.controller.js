const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contractService } = require('../services');
const { getResObject } = require('../utils/response');
const { maxFeeFromReceipt } = require('../utils/fee');

// * POST: 신규 토큰 생성
const deployErc20 = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    privateKey,
    contractName = 'ERC20Preset',
    name,
    symbol,
    initialSupply,
    owner,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await contractService.deploy(network, contractName, {
    privateKey,
    params: [name, symbol, initialSupply, owner],
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      transactionHash: receipt.deployTransaction.hash,
      contractAddress: receipt.address,
      maxFee: maxFeeFromReceipt(receipt.deployTransaction),
    }),
  );
});

// * POST: 토큰 타임 락 계약 생성
const deployTokenTimeLock = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    privateKey,
    tokenAddress,
    beneficiary,
    releaseTime,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await contractService.deploy(network, 'TokenTimelock', {
    privateKey,
    params: [tokenAddress, beneficiary, releaseTime],
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      transactionHash: receipt.deployTransaction.hash,
      contractAddress: receipt.address,
      maxFee: maxFeeFromReceipt(receipt.deployTransaction),
    }),
  );
});

// * POST: 멀티 전송 계약 생성
const deployMultiSend = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    privateKey,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await contractService.deploy(network, 'MultiSend', {
    privateKey,
    params: [],
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      transactionHash: receipt.deployTransaction.hash,
      contractAddress: receipt.address,
      maxFee: maxFeeFromReceipt(receipt.deployTransaction),
    }),
  );
});

// * POST: 멀티 토큰 전송 계약 생성
const deployMultiTransferFrom = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    privateKey,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await contractService.deploy(network, 'MultiTransferFrom', {
    privateKey,
    params: [],
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      transactionHash: receipt.deployTransaction.hash,
      contractAddress: receipt.address,
      maxFee: maxFeeFromReceipt(receipt.deployTransaction),
    }),
  );
});

module.exports = {
  deployErc20,
  deployTokenTimeLock,
  deployMultiSend,
  deployMultiTransferFrom,
};
