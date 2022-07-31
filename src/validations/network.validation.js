const Joi = require('joi');

const network = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
};

const estimateGas = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  body: Joi.object().keys({
    privateKey: Joi.string().required(),
    contractName: Joi.string().required(),
    contractAddress: Joi.string().required(),
    methodName: Joi.string().required(),
    params: Joi.array(),
  }),
};

const getEvents = {
  params: Joi.object().keys({
    network: Joi.string(),
  }),
  query: Joi.object().keys({
    contractName: Joi.string().required(),
    contractAddress: Joi.string().required(),
    eventName: Joi.string(),
  }),
};

module.exports = {
  network,
  estimateGas,
  getEvents,
};
