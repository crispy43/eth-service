const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');
const { getContract, getContractWithSigner } = require('../utils/contract');

const contractName = 'MultiTransferFrom';

/**
 * * owner
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const owner = async (network, contractAddress) => {
  const contract = getContract(network, contractAddress, contractName);
  return contract.owner();
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
  const contract = getContractWithSigner(contractAddress, contractName, signer);
  return contract.transferOwnership(newOwner, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * multiTransferFrom
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {array} tokenAddresses
 * @param {array} fromAddresses
 * @param {array} toAddresses
 * @param {array} amounts
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const multiTransferFrom = async (network, contractAddress, {
  privateKey,
  tokenAddresses,
  fromAddresses,
  toAddresses,
  amounts,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const contract = getContractWithSigner(contractAddress, contractName, signer);
  return contract.multiTransferFrom(tokenAddresses, fromAddresses, toAddresses, amounts, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

module.exports = {
  owner,
  transferOwnership,
  multiTransferFrom,
};
