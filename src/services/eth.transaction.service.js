const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');

/**
 * * getTransaction
 * @param {string} network
 * @param {string} transactionHash
 * @returns {Promise}
 */
const getTransaction = async (network, transactionHash) => getProvider(network)
  .getTransaction(transactionHash);

/**
 * * getTransactionReceipt
 * @param {string} network
 * @param {string} transactionHash
 * @returns {Promise}
 */
const getTransactionReceipt = async (network, transactionHash) => getProvider(network)
  .getTransactionReceipt(transactionHash);

/**
 * * sendTransaction
 * @param {string} network
 * @param {string} transactionHash
 * @returns {Promise}
 */
const sendTransaction = async (network, privateKey, transaction) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  return signer.sendTransaction(transaction);
};

module.exports = {
  getTransaction,
  getTransactionReceipt,
  sendTransaction,
};
