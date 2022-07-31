/**
 * * maxFeeFromReceipt
 * @param {object} receipt
 * @returns {string}
 */
const maxFeeFromReceipt = (receipt) => {
  const maxGasPrice = receipt.maxFeePerGas.add(receipt.maxPriorityFeePerGas);
  return maxGasPrice.mul(receipt.gasLimit).toString();
};

/**
 * * estimateGas
 * @param {object} instance
 * @param {string} methodName
 * @param {array} params
 * @returns {object}
 */
const estimateGas = async (instance, methodName, params) => {
  const gasLimit = await instance.estimateGas[methodName](...params);
  return gasLimit.toString();
};

module.exports = {
  maxFeeFromReceipt,
  estimateGas,
};
