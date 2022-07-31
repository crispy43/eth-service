const Joi = require('joi');

const getTransaction = {
  params: Joi.object().keys({
    network: Joi.string().required(),
  }),
  query: Joi.object().keys({
    transactionHash: Joi.string()
      .min(64)
      .max(66)
      .regex(/^[A-Za-z0-9+]*$/)
      .required(),
  }),
};

const send = {
  params: Joi.object().keys({
    network: Joi.string().required(),
  }),
  body: Joi.object().keys({
    privateKey: Joi.string().required(),
    to: Joi.string().required(),
    amount: Joi.string().required(),
    maxFeePerGas: Joi.string(),
    maxPriorityFeePerGas: Joi.string(),
    gasLimit: Joi.string(),
    gasPrice: Joi.string(),
  }),
};

module.exports = {
  getTransaction,
  send,
};
