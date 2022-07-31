const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { erc20Service } = require('../services');
const { getResObject } = require('../utils/response');
const { maxFeeFromReceipt } = require('../utils/fee');

// * GET: Token 정보 조회
const getTokenInfo = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;

  const tokenInfo = await Promise.all([
    erc20Service.name(network, contractAddress),
    erc20Service.symbol(network, contractAddress),
    erc20Service.decimals(network, contractAddress),
    erc20Service.totalSupply(network, contractAddress),
  ]);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      name: tokenInfo[0],
      symbol: tokenInfo[1],
      decimals: tokenInfo[2],
      totalSupply: tokenInfo[3].toString(),
    }),
  );
});

// * GET: Balance 조회
const getBalance = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    address,
  } = req.query;

  const balance = await erc20Service.balanceOf(network, contractAddress, address);

  res.status(httpStatus.OK).json(getResObject(httpStatus.OK, balance.toString()));
});

// * POST: 토큰 전송
const transfer = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    to,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await erc20Service.transfer(network, contractAddress, {
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

// * PUT: 토큰 대리 전송
const transferFrom = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    from,
    to,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await erc20Service.transferFrom(network, contractAddress, {
    privateKey,
    from,
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

// * GET: Allowance 조회
const getAllowance = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    from,
    spender,
  } = req.query;

  const allowance = await erc20Service.allowance(network, contractAddress, {
    from,
    spender,
  });

  res.status(httpStatus.OK).json(getResObject(httpStatus.OK, allowance.toString()));
});

// * POST: Approve 적용
const approve = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    spender,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await erc20Service.approve(network, contractAddress, {
    privateKey,
    spender,
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

// * GET: Owner 조회
const getOwner = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;

  const owner = await erc20Service.owner(network, contractAddress);

  res.status(httpStatus.OK).json(getResObject(httpStatus.OK, owner));
});

// * POST: Owner 변경
const transferOwnership = catchAsync(async (req, res) => {
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

  const receipt = await erc20Service
    .transferOwnership(network, contractAddress, {
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

// * GET: Lock 수량 조회
const getLock = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    address,
  } = req.query;

  const lock = await erc20Service.getLock(network, contractAddress, address);

  res.status(httpStatus.OK).json(getResObject(httpStatus.OK, {
    releaseTime: lock.lockTime.toString(),
    amount: lock.lockAmount.toString(),
  }));
});

// * POST: Lock Up
const setLock = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    address,
    releaseTime,
    amount,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await erc20Service.setLock(network, contractAddress, {
    privateKey,
    address,
    releaseTime,
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
  getTokenInfo,
  getBalance,
  transfer,
  transferFrom,
  getAllowance,
  approve,
  getOwner,
  transferOwnership,
  getLock,
  setLock,
};
