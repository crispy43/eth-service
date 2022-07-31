const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { erc20Service, multiTransferFromService } = require('../services');
const { getResObject } = require('../utils/response');
const { maxFeeFromReceipt } = require('../utils/fee');

// * GET: Owner의 토큰 잔액 및 allowance 조회
const getOwnerTokenInfo = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress, tokenAddress } = req.query;
  const owner = await multiTransferFromService.owner(network, contractAddress);
  const tokenBalance = await erc20Service.balanceOf(network, tokenAddress, owner);
  const tokenAllowance = await erc20Service.allowance(network, tokenAddress, {
    from: owner,
    spender: contractAddress,
  });
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      balance: tokenBalance.toString(),
      allowance: tokenAllowance.toString(),
    }),
  );
});

// * POST: 멀티 전송
const multiTransferFrom = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    privateKey,
    tokenAddresses,
    fromAddresses,
    toAddresses,
    amounts,
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  } = req.body;

  const receipt = await multiTransferFromService
    .multiTransferFrom(network, contractAddress, {
      privateKey,
      tokenAddresses,
      fromAddresses,
      toAddresses,
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

// * GET: Onwer 조회
const getOwner = catchAsync(async (req, res) => {
  const { network } = req.params;
  const { contractAddress } = req.query;
  const owner = await multiTransferFromService.owner(network, contractAddress);
  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, owner),
  );
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

  const receipt = await multiTransferFromService
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

module.exports = {
  getOwnerTokenInfo,
  multiTransferFrom,
  getOwner,
  transferOwnership,
};
