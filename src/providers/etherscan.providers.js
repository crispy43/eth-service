const got = require('got');

/**
 * * getInstance
 * @param {string} network
 * @returns {object}
 */
const getInstance = (network) => {
  switch (network) {
    case 'ethereum':
      return got.extend({
        prefixUrl: process.env.ETHERSCAN_ETHEREUM_URI,
      });
    case 'kovan':
      return got.extend({
        prefixUrl: process.env.ETHERSCAN_KOVAN_URI,
      });
    case 'bsc':
      return got.extend({
        prefixUrl: process.env.BSCSCAN_URI,
      });
    case 'bsct':
      return got.extend({
        prefixUrl: process.env.BSCSCAN_TEST_PROVIDER,
      });
    case 'ropsten':
    default:
      return got.extend({
        prefixUrl: process.env.ETHERSCAN_ROPSTEN_URI,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        },
      });
  }
};

/**
 * * getApiKey
 * @param {string} network
 * @returns {string}
 */
const getApiKey = (network) => {
  switch (network) {
    case 'ethereum':
      return process.env.ETHERSCAN_ETHEREUM_APIKEY;
    case 'kovan':
      return process.env.ETHERSCAN_KOVAN_APIKEY;
    case 'bsc':
      return process.env.BSCSCAN_APIKEY;
    case 'bsct':
      return process.env.BSCSCAN_TEST_APIKEY;
    case 'ropsten':
    default:
      return process.env.ETHERSCAN_ROPSTEN_APIKEY;
  }
};

module.exports = {
  getInstance,
  getApiKey,
};
