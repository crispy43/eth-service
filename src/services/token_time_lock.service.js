const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');
const { getContract, getContractWithSigner } = require('../utils/contract');

const contractName = 'TokenTimelock';

/**
 * * token
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const token = async (network, contractAddress) => {
  const tokenTimeLock = getContract(network, contractAddress, contractName);
  return tokenTimeLock.token();
};

/**
 * * beneficiary
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const beneficiary = async (network, contractAddress) => {
  const tokenTimeLock = getContract(network, contractAddress, contractName);
  return tokenTimeLock.beneficiary();
};

/**
 * * releaseTime
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const releaseTime = async (network, contractAddress) => {
  const tokenTimeLock = getContract(network, contractAddress, contractName);
  return tokenTimeLock.releaseTime();
};

/**
 * * release
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const release = async (network, contractAddress, {
  privateKey,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const tokenTimeLock = getContractWithSigner(contractAddress, contractName, signer);
  return tokenTimeLock.release({
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

module.exports = {
  token,
  beneficiary,
  releaseTime,
  release,
};
