const { providers } = require('ethers');

// * providers
const ethereumProvider = new providers.JsonRpcProvider({
  url: process.env.ETHEREUM_PROVIDER,
});
const polygonProvider = new providers.JsonRpcProvider({
  url: process.env.POLYGON_PROVIDER,
});
const amoyProvider = new providers.JsonRpcProvider({
  url: process.env.POLYGON_PROVIDER,
});
const ropstenProvider = new providers.JsonRpcProvider({
  url: process.env.ROPSTEN_PROVIDER,
});
const goerliProvider = new providers.JsonRpcProvider({
  url: process.env.GOERLI_PROVIDER,
});
const kovanProvider = new providers.JsonRpcProvider({
  url: process.env.KOVAN_PROVIDER,
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
    case 'polygon':
      return polygonProvider;
    case 'amoy':
      return amoyProvider;
    case 'kovan':
      return kovanProvider;
    case 'local':
      return localProvider;
    case 'ropsten':
      return ropstenProvider;
    case 'goerli':
    default:
      return goerliProvider;
  }
};

module.exports = {
  ethereumProvider,
  polygonProvider,
  amoyProvider,
  ropstenProvider,
  goerliProvider,
  kovanProvider,
  localProvider,
  getProvider,
};
