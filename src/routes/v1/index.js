const express = require('express');
const docsRoute = require('./docs.route');
const networkRoute = require('./network.route');
const transactionRoute = require('./transaction.route');
const deployRoute = require('./deploy.route');
const erc20Route = require('./erc20.route');
const etherscanRoute = require('./etherscan.route');
const tokenTimeLockRoute = require('./token_time_lock.route');
const multiSendRoute = require('./multi_send.route');
const multiTransferFromRoute = require('./multi_transfer_from.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/network',
    route: networkRoute,
  },
  {
    path: '/transaction',
    route: transactionRoute,
  },
  {
    path: '/deploy',
    route: deployRoute,
  },
  {
    path: '/erc20',
    route: erc20Route,
  },
  {
    path: '/token_time_lock',
    route: tokenTimeLockRoute,
  },
  {
    path: '/multi_send',
    route: multiSendRoute,
  },
  {
    path: '/multi_transfer_from',
    route: multiTransferFromRoute,
  },
  {
    path: '/etherscan',
    route: etherscanRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
