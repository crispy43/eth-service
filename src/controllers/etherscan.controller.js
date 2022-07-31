const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { etherscanService } = require('../services');
const { getResObject } = require('../utils/response');

// * GET: ERC20 거래내역 조회
const getErc20History = catchAsync(async (req, res) => {
  const { network } = req.params;
  const {
    contractAddress,
    address,
    sort = 'desc',
    offset = 20,
    page = 1,
    maxCount,
  } = req.query;

  const etherscanRes = await Promise.all([
    etherscanService.getTokenHistory(network, contractAddress, {
      address,
      sort,
      offset: maxCount || process.env.ETHERSCAN_MAX_TXCOUNT || 100,
      page: 1,
    }),
    etherscanService.getTokenHistory(network, contractAddress, {
      address,
      sort,
      offset,
      page,
    }),
  ]);

  res.status(httpStatus.OK).json(
    getResObject(httpStatus.OK, {
      totalCount: etherscanRes[0].result.length,
      history: etherscanRes[1].result,
    }),
  );
});

module.exports = {
  getErc20History,
};
