const Joi = require('joi');

const contract = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.string().required(),
  }),
};

const release = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  body: Joi.object().keys({
    privateKey: Joi.string().required(),
    contractAddress: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

module.exports = {
  contract,
  release,
};
