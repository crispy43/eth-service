const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { erc20Service, tokenTimeLockService } = require('../services');
const { getResObject } = require('../utils/response');
const { maxFeeFromReceipt } = require('../utils/fee');

// * GET: 토큰 잔액 조회
const getTokenBalance = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;

  const tokenAddress = await tokenTimeLockService.token(network, contractAddress);
  const tokenBalance = await erc20Service.balanceOf(network, tokenAddress, contractAddress);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, tokenBalance.toString()),
  );
});

// * GET: 계약 정보 조회
const getInfo = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;

  const info = await Promise.all([
    tokenTimeLockService.token(network, contractAddress),
    tokenTimeLockService.beneficiary(network, contractAddress),
    tokenTimeLockService.releaseTime(network, contractAddress),
  ]);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      tokenAddress: info[0],
      beneficiary: info[1],
      releaseTime: parseInt(info[2].toString()),
    }),
  );
});

// * POST: 배포
const release = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await tokenTimeLockService.release(network, contractAddress, {
    privateKey,
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
  getTokenBalance,
  getInfo,
  release,
};
