const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');
const { getContract, getContractWithSigner } = require('../utils/contract');

const contractName = 'ERC20LockablePreset';

/**
 * * name
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const name = async (network, contractAddress) => {
  const token = getContract(network, contractAddress, contractName);
  return token.name();
};

/**
 * * symbol
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const symbol = async (network, contractAddress) => {
  const token = getContract(network, contractAddress, contractName);
  return token.symbol();
};

/**
 * * decimals
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const decimals = async (network, contractAddress) => {
  const token = getContract(network, contractAddress, contractName);
  return token.decimals();
};

/**
 * * totalSupply
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const totalSupply = async (network, contractAddress) => {
  const token = getContract(network, contractAddress, contractName);
  return token.totalSupply();
};

/**
 * * balanceOf
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} address
 * @returns {Promise}
 */
const balanceOf = async (network, contractAddress, address) => {
  const token = getContract(network, contractAddress, contractName);
  return token.balanceOf(address);
};

/**
 * * transfer
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {string} to
 * @param {string} amount
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const transfer = async (network, contractAddress, {
  privateKey,
  to,
  amount,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const token = getContractWithSigner(contractAddress, contractName, signer);
  return token.transfer(to, amount, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * transferFrom
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {string} from
 * @param {string} to
 * @param {string} amount
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const transferFrom = async (network, contractAddress, {
  privateKey,
  from,
  to,
  amount,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const token = getContractWithSigner(contractAddress, contractName, signer);
  return token.transferFrom(from, to, amount, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * allowance 조회
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} from
 * @param {string} spender
 * @returns {Promise}
 */
const allowance = async (network, contractAddress, {
  from,
  spender,
}) => {
  const token = getContract(network, contractAddress, contractName);
  return token.allowance(from, spender);
};

/**
 * * approve
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {string} spender
 * @param {string} amount
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const approve = async (network, contractAddress, {
  privateKey,
  spender,
  amount,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const token = getContractWithSigner(contractAddress, contractName, signer);
  return token.approve(spender, amount, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * owner
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const owner = async (network, contractAddress) => {
  const token = getContract(network, contractAddress, contractName);
  return token.owner();
};

/**
 * * transferOwnership
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {string} newOwner
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const transferOwnership = async (network, contractAddress, {
  privateKey,
  newOwner,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const token = getContractWithSigner(contractAddress, contractName, signer);
  return token.transferOwnership(newOwner, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * getLock
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} address
 * @returns {Promise}
 */
const getLock = async (network, contractAddress, address) => {
  const token = getContract(network, contractAddress, contractName);
  return token.getLock(address);
};

/**
 * * setLock
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {string} address
 * @param {string} releaseTime
 * @param {string} amount
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const setLock = async (network, contractAddress, {
  privateKey,
  address,
  releaseTime,
  amount,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const token = getContractWithSigner(contractAddress, contractName, signer);
  return token.setLock(address, releaseTime, amount, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

module.exports = {
  name,
  symbol,
  decimals,
  totalSupply,
  balanceOf,
  transfer,
  transferFrom,
  allowance,
  approve,
  owner,
  transferOwnership,
  getLock,
  setLock,
};
