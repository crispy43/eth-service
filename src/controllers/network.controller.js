const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ethNetworkService, ethBlockService, contractService } = require('../services');
const { getResObject } = require('../utils/response');

// * GET: 수수료 정보 조회
const getFee = catchAsync(async (req, res) => {
  const { network } = req.params;
  const latestBlock = await ethBlockService.getBlock(network, 'latest');
  const feeData = await ethNetworkService.getFeeData(network);
  const latestBlockGasLimit = latestBlock.gasLimit.toString();
  const latestBlockGasUsed = latestBlock.gasUsed.toString();
  const gasUsedRate = (parseInt(latestBlockGasUsed) / (parseInt(latestBlockGasLimit) / 2));
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      latestBlockNumber: latestBlock.number,
      latestBlockTimestamp: latestBlock.timestamp,
      latestBlockBaseFeePerGas: latestBlock.baseFeePerGas
        ? latestBlock.baseFeePerGas.toString()
        : null,
      latestBlockGasLimit,
      latestBlockGasUsed,
      latestBlockGasUsedRate: gasUsedRate,
      maxFeePerGas: feeData.maxFeePerGas
        ? feeData.maxFeePerGas.toString()
        : null,
      maxPriorityFeePerGas: feeData.maxFeePerGas ? {
        slow: process.env.MAX_PRIORITY_FEE_PER_GAS_SLOW,
        normal: process.env.MAX_PRIORITY_FEE_PER_GAS_NORMAL,
        fast: process.env.MAX_PRIORITY_FEE_PER_GAS_FAST,
      } : null,
      gasPrice: feeData.gasPrice.toString(),
    }),
  );
});

// * GET: 가스 사용량 추정
const estimateGas = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    privateKey,
    contractName,
    contractAddress,
    methodName,
    params,
  } = req.body;
  const gasLimit = await contractService
    .estimateGasFromSigner(network, contractName, contractAddress, {
      privateKey,
      methodName,
      params,
    });
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, gasLimit.toString()),
  );
});

// * GET: Event 로그 조회
const getEvents = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractName,
    contractAddress,
    eventName,
  } = req.query;
  const events = await contractService.queryEvents(network, contractName, contractAddress, {
    eventName,
  });
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, events),
  );
});

module.exports = {
  getFee,
  estimateGas,
  getEvents,
};
