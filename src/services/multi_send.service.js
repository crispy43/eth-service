const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');
const { getContract, getContractWithSigner } = require('../utils/contract');

const contractName = 'MultiSend';

/**
 * * getOwner
 * @param {string} network
 * @param {string} contractAddress
 * @returns {Promise}
 */
const getOwner = async (network, contractAddress) => {
  const multiSend = getContract(network, contractAddress, contractName);
  return multiSend.getOwner();
};

/**
 * * changeOwner
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
const changeOwner = async (network, contractAddress, {
  privateKey,
  newOwner,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const multiSend = getContractWithSigner(contractAddress, contractName, signer);
  return multiSend.changeOwner(newOwner, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * withdrawls
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {array} addresses
 * @param {array} amounts
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const withdrawls = async (network, contractAddress, {
  privateKey,
  addresses,
  amounts,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const multiSend = getContractWithSigner(contractAddress, contractName, signer);
  return multiSend.withdrawls(addresses, amounts, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * charge
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} privateKey
 * @param {array} addresses
 * @param {array} amounts
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const charge = async (network, contractAddress, {
  privateKey,
  amount,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const multiSend = getContractWithSigner(contractAddress, contractName, signer);
  const transaction = await multiSend.populateTransaction.charge({
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
  transaction.value = amount;
  return signer.sendTransaction(transaction);
};

module.exports = {
  getOwner,
  changeOwner,
  withdrawls,
  charge,
};
