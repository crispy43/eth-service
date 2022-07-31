const Joi = require('joi');
const { networkValidation, addressValidation } = require('./common');

const contract = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
  }),
};

const getBalance = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    address: Joi.custom((value) => addressValidation(value)).required(),
  }),
};

const transfer = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    to: Joi.custom((value) => addressValidation(value)).required(),
    amount: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const transferFrom = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    from: Joi.custom((value) => addressValidation(value)).required(),
    to: Joi.custom((value) => addressValidation(value)).required(),
    amount: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const getAllowance = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    from: Joi.custom((value) => addressValidation(value)).required(),
    spender: Joi.custom((value) => addressValidation(value)).required(),
  }),
};

const approve = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    spender: Joi.custom((value) => addressValidation(value)).required(),
    amount: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
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

const getLock = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    address: Joi.custom((value) => addressValidation(value)).required(),
  }),
};

const setLock = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  body: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    privateKey: Joi.string().required(),
    address: Joi.custom((value) => addressValidation(value)).required(),
    releaseTime: Joi.number().integer()
      .min(0)
      .max(9999999999)
      .required(),
    amount: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

module.exports = {
  contract,
  getBalance,
  transfer,
  transferFrom,
  getAllowance,
  approve,
  transferOwnership,
  getLock,
  setLock,
};
