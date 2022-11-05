const Joi = require('joi');
const { ethers } = require('ethers');

// * 네트워크 validation
const networkValidation = () => Joi.string().valid('goerli', 'ropsten', 'ethereum', 'bsc', 'bsct', 'local', 'kovan', 'baobab', 'klaytn').insensitive().required();

// * 주소 validation
const addressValidation = (address) => {
  if (ethers.utils.isAddress(address)) {
    return address;
  }
  throw new Error('invalid address');
};

module.exports = {
  networkValidation,
  addressValidation,
};
