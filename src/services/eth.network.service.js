const { getProvider } = require('../providers/eth.providers');

/**
 * * getNetwork
 * @param {string} network
 * @returns {Promise}
 */
const getNetwork = async (network) => getProvider(network).getNetwork();

/**
 * * getBlockNumber
 * @param {string} network
 * @returns {Promise}
 */
const getBlockNumber = async (network) => getProvider(network).getBlockNumber();

/**
 * * getFeeData
 * @param {string} network
 * @returns {Promise}
 */
const getFeeData = async (network) => getProvider(network).getFeeData();

module.exports = {
  getNetwork,
  getBlockNumber,
  getFeeData,
};
