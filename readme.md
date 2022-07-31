# eth-service

Use to types of ethereum blockchain. Only restful rules.

## Quick Start

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

or use pm2

```bash
pm2 start ecosystem.config.json
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=4000

# Blockchain Providers
ETHEREUM_PROVIDER=https://mainnet.infura.io/v3/infuraApiKey
ROPSTEN_PROVIDER=https://ropsten.infura.io/v3/infuraApiKey
KOVAN_PROVIDER=https://kovan.infura.io/v3/infuraApiKey
BSC_PROVIDER=https://bsc-dataseed.binance.org
BSC_TEST_PROVIDER=https://data-seed-prebsc-1-s1.binance.org:8545
LOCAL_PROVIDER=http://127.0.0.1:8545

# Gas config
MAX_PRIORITY_FEE_PER_GAS_SLOW=1000000000
MAX_PRIORITY_FEE_PER_GAS_NORMAL=1500000000
MAX_PRIORITY_FEE_PER_GAS_FAST=2000000000
CHAIN_GAS_LIMIT=1000000

# Etherscan
ETHERSCAN_MAX_TXCOUNT=100
ETHERSCAN_ETHEREUM_URI=https://api.etherscan.io/api
ETHERSCAN_ETHEREUM_APIKEY=etherscanApiKey
ETHERSCAN_ROPSTEN_URI=https://api-ropsten.etherscan.io/api
ETHERSCAN_ROPSTEN_APIKEY=etherscanApiKey
ETHERSCAN_KOVAN_URI=https://api-kovan.etherscan.io/api
ETHERSCAN_KOVAN_APIKEY=etherscanApiKey
BSCSCAN_URI=https://api.bscscan.com/api
BSCSCAN_APIKEY=bscscanApiKey
BSCSCAN_TEST_URI=https://testnet.bscscan.com
BSCSCAN_TEST_APIKEY=bscscanApiKey
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--contracts\      # Contract files
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--providers\      # Blockchain client instance generators
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`
