const Joi = require('joi');

const deploy = {
  params: Joi.object().keys({
    network: Joi.string().required(),
  }),
  body: Joi.object().keys({
    contractName: Joi.string(),
    privateKey: Joi.string().required(),
    params: Joi.array(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const erc20 = {
  params: Joi.object().keys({
    network: Joi.string().required(),
  }),
  body: Joi.object().keys({
    contractName: Joi.string(),
    privateKey: Joi.string().required(),
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    initialSupply: Joi.string().required(),
    owner: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

const tokenTimeLock = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  body: Joi.object().keys({
    privateKey: Joi.string().required(),
    tokenAddress: Joi.string().required(),
    beneficiary: Joi.string().required(),
    releaseTime: Joi.date().timestamp('unix')
      .greater('now')
      .less('2200-01-01')
      .raw()
      .required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

module.exports = {
  deploy,
  erc20,
  tokenTimeLock,
};
