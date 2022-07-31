const Joi = require('joi');
const { networkValidation, addressValidation } = require('./common');

const contract = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.string().required(),
  }),
};

const getOwnerTokenInfo = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.string().required(),
    tokenAddress: Joi.string().required(),
  }),
};

const transferOwnership = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    newOwner: Joi.custom((value) => addressValidation(value)).required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const multiTransferFrom = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    tokenAddresses: Joi.array().min(1).max(500).required(),
    fromAddresses: Joi.array().min(1).max(500).required(),
    toAddresses: Joi.array().min(1).max(500).required(),
    amounts: Joi.array().min(1).max(500).required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

module.exports = {
  contract,
  getOwnerTokenInfo,
  transferOwnership,
  multiTransferFrom,
};
