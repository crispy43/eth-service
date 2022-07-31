const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');

/**
 * * getBalance
 * @param {string} network
 * @param {string} address
 * @returns {Promise}
 */
const getBalance = async (network, address) => getProvider(network).getBalance(address);

/**
 * * send
 * @param {string} network
 * @param {string} privateKey
 * @param {string} to
 * @param {string} amount
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const send = async (network, {
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
  const transaction = {
    to,
    value: amount,
    nonce: await signer.getTransactionCount(),
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  };
  return signer.sendTransaction(transaction);
};

module.exports = {
  getBalance,
  send,
};
