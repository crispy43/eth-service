const { getProvider } = require('../providers/eth.providers');

/**
 * * getBlock
 * @param {string} network
 * @param {number} blockNumber
 * @returns {Promise}
 */
const getBlock = async (network, blockNumber) => getProvider(network).getBlock(blockNumber);

/**
 * * getBlockWithTransactions
 * @param {string} network
 * @param {number} blockNumber
 * @returns {Promise}
 */
const getBlockWithTransactions = async (network, blockNumber) => getProvider(network)
  .getBlockWithTransactions(blockNumber);

module.exports = {
  getBlock,
  getBlockWithTransactions,
};
