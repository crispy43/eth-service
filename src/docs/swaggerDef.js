const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Ethereum Kind Blockchain Service API Documentation',
    description: '이더리움 계열 블록체인 서비스',
    version,
  },
  servers: [
    {
      url: `http://3.37.95.131:${config.port}/v1`,
    },
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
