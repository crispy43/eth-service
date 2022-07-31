const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const { getProvider } = require('../providers/eth.providers');

const getAbi = (contractName) => {
  switch (contractName) {
    case 'ERC20Preset':
    case 'ERC20PresetFixedSupply':
    case 'ERC20LockablePreset':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/erc20/ERC20LockablePreset.abi')).toString();
    case 'TokenTimelock':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/token_time_lock/TokenTimelock.abi')).toString();
    case 'MultiSend':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/multi_send/MultiSend.abi')).toString();
    case 'MultiTransferFrom':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/multi_transfer_from/MultiTransferFrom.abi')).toString();
    default:
      return null;
  }
};

const getBin = (contractName) => {
  switch (contractName) {
    case 'ERC20Preset':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/erc20/ERC20Preset.bin')).toString();
    case 'ERC20PresetFixedSupply':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/erc20/ERC20PresetFixedSupply.bin')).toString();
    case 'ERC20LockablePreset':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/erc20/ERC20LockablePreset.bin')).toString();
    case 'TokenTimelock':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/token_time_lock/TokenTimelock.bin')).toString();
    case 'MultiSend':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/multi_send/MultiSend.bin')).toString();
    case 'MultiTransferFrom':
      return fs.readFileSync(path.resolve(__dirname, '../contracts/multi_transfer_from/MultiTransferFrom.bin')).toString();
    default:
      return null;
  }
};

const getContract = (network, contractAddress, contractName) => new ethers
  .Contract(contractAddress, getAbi(contractName), getProvider(network));

const getContractWithSigner = (contractAddress, contractName, signer) => new ethers
  .Contract(contractAddress, getAbi(contractName), signer);

module.exports = {
  getAbi,
  getBin,
  getContract,
  getContractWithSigner,
};
