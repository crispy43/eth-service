const { providers } = require('ethers');

// * providers
const ethereumProvider = new providers.JsonRpcProvider({
  url: process.env.ETHEREUM_PROVIDER,
});
const ropstenProvider = new providers.JsonRpcProvider({
  url: process.env.ROPSTEN_PROVIDER,
});
const kovanProvider = new providers.JsonRpcProvider({
  url: process.env.KOVAN_PROVIDER,
});
const bscProvider = new providers.JsonRpcProvider({
  url: process.env.BSC_PROVIDER,
});
const bscTestProvider = new providers.JsonRpcProvider({
  url: process.env.BSC_TEST_PROVIDER,
});
const klaytnProvider = new providers.JsonRpcProvider({
  url: process.env.KLAY_PROVIDER,
});
const klayTestProvider = new providers.JsonRpcProvider({
  url: process.env.KLAY_TEST_PROVIDER,
});
const localProvider = new providers.JsonRpcProvider({
  url: process.env.LOCAL_PROVIDER,
});

/**
 * * getProvider
 * @param {string} network
 * @returns {object}
 */
const getProvider = (network) => {
  switch (network) {
    case 'ethereum':
      return ethereumProvider;
    case 'kovan':
      return kovanProvider;
    case 'bsc':
      return bscProvider;
    case 'bsct':
      return bscTestProvider;
    case 'klaytn':
      return klaytnProvider;
    case 'baobab':
      return klayTestProvider;
    case 'local':
      return localProvider;
    case 'ropsten':
    default:
      return ropstenProvider;
  }
};

module.exports = {
  ethereumProvider,
  ropstenProvider,
  kovanProvider,
  bscProvider,
  bscTestProvider,
  klaytnProvider,
  klayTestProvider,
  localProvider,
  getProvider,
};
