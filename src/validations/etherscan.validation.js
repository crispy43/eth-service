const Joi = require('joi');
const { networkValidation, addressValidation } = require('./common');

const getErc20History = {
  params: Joi.object().keys({
    network: networkValidation(),
  }),
  query: Joi.object().keys({
    contractAddress: Joi.custom((value) => addressValidation(value)).required(),
    address: Joi.custom((value) => addressValidation(value)),
    sort: Joi.string(),
    offset: Joi.number().integer(),
    page: Joi.number().integer(),
    maxCount: Joi.number().integer(),
  }),
};

module.exports = {
  getErc20History,
};
