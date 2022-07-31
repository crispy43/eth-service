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

const withdrawls = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    addresses: Joi.array().min(1).max(500).required(),
    amounts: Joi.array().min(1).max(500).required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const charge = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    amount: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const changeOwner = {
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

module.exports = {
  contract,
  withdrawls,
  charge,
  changeOwner,
};
