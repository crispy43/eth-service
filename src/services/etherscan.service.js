// const got = require('got');
const { getInstance, getApiKey } = require('../providers/etherscan.providers');

/**
 * * getTokenHistory
 * @param {string} network
 * @param {string} contractAddress
 * @param {string} sort
 * @param {number} offset
 * @param {number} page
 * @returns {Promise}
 */
const getTokenHistory = async (network, contractAddress, {
  address,
  sort,
  offset,
  page,
}) => getInstance(network).get('', {
  searchParams: {
    apiKey: getApiKey(network),
    module: 'account',
    action: 'tokentx',
    contractaddress: contractAddress,
    address,
    sort,
    offset,
    page,
  },
}).json();

module.exports = {
  getTokenHistory,
};
