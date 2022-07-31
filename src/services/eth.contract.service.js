const { ethers, ContractFactory } = require('ethers');
const { getProvider } = require('../providers/eth.providers');
const {
  getAbi,
  getBin,
  getContract,
  getContractWithSigner,
} = require('../utils/contract');

/**
 * * deploy
 * @param {string} network
 * @param {string} contractName
 * @param {string} privateKey
 * @param {array} params
 * @param {string} maxFeePerGas
 * @param {string} maxPriorityFeePerGas
 * @param {string} gasLimit
 * @param {string} gasPrice
 * @returns {Promise}
 */
const deploy = async (network, contractName, {
  privateKey,
  params,
  maxFeePerGas,
  maxPriorityFeePerGas,
  gasLimit,
  gasPrice,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const factory = new ContractFactory(getAbi(contractName), getBin(contractName), signer);
  return factory.deploy(...params, {
    maxFeePerGas,
    maxPriorityFeePerGas,
    gasLimit,
    gasPrice,
  });
};

/**
 * * estimateDeployTransactionGas
 * @param {string} network
 * @param {string} contractName
 * @param {string} privateKey
 * @param {array} params
 * @returns {Promise}
 */
const estimateDeployTransactionGas = async (network, contractName, {
  privateKey,
  params,
}) => {
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const factory = new ContractFactory(getAbi(contractName), getBin(contractName), signer);
  return signer.estimateGas(factory.getDeployTransaction(...params, {
    gasLimit: process.env.CHAIN_GAS_LIMIT || '5000000',
  }));
};

/**
 * * estimateGasFromSigner
 * @param {string} network
 * @param {string} contractName
 * @param {string} contractAddress
 * @param {string} methodName
 * @param {array} params
 * @returns {Promise}
 */
const estimateGasFromSigner = async (network, contractName, contractAddress, {
  privateKey,
  methodName,
  params,
}) => {
  console.log('=== estimateGasFromSigner ===');
  console.log(network, contractName, contractAddress, methodName, privateKey);
  console.log(params);
  const account = new ethers.Wallet(privateKey);
  const signer = account.connect(getProvider(network));
  const contract = getContractWithSigner(contractAddress, contractName, signer);
  return signer.estimateGas(await contract.populateTransaction[methodName](...params, {
    gasLimit: process.env.CHAIN_GAS_LIMIT || '5000000',
  }));
};

/**
 * * queryEvents
 * @param {string} network
 * @param {string} contractName
 * @param {string} contractAddress
 * @param {string} eventName
 * @param {any} fromBlock
 * @param {any} toBlock
 * @returns {Promise}
 */
const queryEvents = async (network, contractName, contractAddress, {
  eventName,
  fromBlock = 0,
  toBlock = 'latest',
}) => {
  const contract = getContract(network, contractAddress, contractName);
  if (eventName) {
    const filter = contract.filters[eventName]();
    return contract.queryFilter(filter, fromBlock, toBlock);
  }
  return contract.queryFilter('*', fromBlock, toBlock);
};

module.exports = {
  deploy,
  estimateDeployTransactionGas,
  estimateGasFromSigner,
  queryEvents,
};
